from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Transacao
from .serializers import TransacaoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

class TransacaoListCreateView(generics.ListCreateAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transacoes = Transacao.objects.filter(usuario=request.user)

        receitas = transacoes.filter(tipo='receita').aggregate(total=Sum('valor'))['total'] or 0.00
        despesas = transacoes.filter(tipo='despesa').aggregate(total=Sum('valor'))['total'] or 0.00

        saldo = float(receitas) - float(despesas)

        return Response({
            "total_receitas": round(float(receitas), 2),
            "total_despesas": round(float(despesas), 2),
            "saldo": round(saldo, 2)
        })

class TransacaoDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)