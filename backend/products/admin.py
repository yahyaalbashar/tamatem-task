from django.contrib import admin
from .models import Product, Order


@admin.register(Product)
class AdminProduct(admin.ModelAdmin):
    pass


@admin.register(Order)
class AdminOrder(admin.ModelAdmin):
    pass
