from django.urls import path
from .views import CategoriaListCreateView, TransacaoListCreateView

urlpatterns = [
    path('categorias/', CategoriaListCreateView.as_view(), name='categoria-list'),
    path('transacoes/', TransacaoListCreateView.as_view(), name='transacao-list'),
]

