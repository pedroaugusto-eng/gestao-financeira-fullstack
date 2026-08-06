from django.db import models
from django.conf import settings

class Categoria(models.Model):
    TIPO_CHOICES = (
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),
    )

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    tipo = models.CharField(max_length=7, choices=TIPO_CHOICES)

    def __str__(self):
        return f"{self.nome} ({self.tipo})"


class Transacao(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)

    descricao = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2)  # Até 99 milhões com 2 casas decimais
    data = models.DateField()

    def __str__(self):
        return f"{self.descricao} - R$ {self.valor}"