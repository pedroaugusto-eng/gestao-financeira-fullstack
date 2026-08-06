from django.urls import path
from .views import CategoriaListCreateView, CategoriaDetailView, TransacaoListCreateView, DashboardView

urlpatterns = [
    path('categorias/', CategoriaListCreateView.as_view(), name='categoria-list'),
    path('categorias/<int:pk>/', CategoriaDetailView.as_view(), name='categoria-detail'),
    path('transacoes/', TransacaoListCreateView.as_view(), name='transacao-list'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]

