from rest_framework import serializers
from .models import Categoria, Transacao

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'tipo']

class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        fields = ['id', 'categoria', 'descricao', 'valor', 'data']