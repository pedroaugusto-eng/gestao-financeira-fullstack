from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Categoria, Transacao
from .serializers import CategoriaSerializer, TransacaoSerializer

class CategoriaListCreateView(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Categoria.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class TransacaoListCreateView(generics.ListCreateAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)