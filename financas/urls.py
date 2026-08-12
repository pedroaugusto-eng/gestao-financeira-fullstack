from django.urls import path
from .views import TransacaoListCreateView, DashboardView, TransacaoDetailView

urlpatterns = [
    path('transacoes/', TransacaoListCreateView.as_view(), name='transacao-list'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('transacoes/<int:pk>/', TransacaoDetailView.as_view(), name='transacao_detail'),
]