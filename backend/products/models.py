from django.db import models
from .choices import CountryChoices


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(choices=CountryChoices, default=CountryChoices.JORDAN)

    def __str__(self):
        return self.title

class Order(models.Model):
    user = models.ForeignKey('auth.user', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}-{self.product}-{self.created_at}"