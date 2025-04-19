from rest_framework import serializers
from .models import Product, Order


class BaseProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class BaseOrderSerializer(serializers.ModelSerializer):
    product = BaseProductSerializer()
    class Meta:
        model = Order
        fields = "__all__"