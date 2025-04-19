from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView
    )
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from .models import Product, Order
from .serializers import BaseOrderSerializer, BaseProductSerializer
from .endpoints_schema_params import list_products_params

class ListProductsAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = BaseProductSerializer

    @extend_schema(
        summary="List Products",
        description="Retrieve a paginated list of products. Optionally filter by location.",
        parameters= list_products_params,
        responses={200: BaseProductSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class RetrieveProductAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = BaseProductSerializer
    lookup_field = "id"


    @extend_schema(
        summary="Product Detail",
        description="Retrieve a product and see it's details.",
        parameters= None,
        responses={200: BaseProductSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class CreateOrderAPIView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = BaseOrderSerializer

    def create(self, request):
        product_id = request.data.get('productId')
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=404)

        # Create order
        order = Order.objects.create(user=request.user, product=product)
        serializer = BaseOrderSerializer(order)
        return Response(serializer.data, status=201)


class RetrieveOrderAPIView(RetrieveAPIView):
    queryset = Order.objects.all().select_related("user", "product")
    serializer_class = BaseOrderSerializer
    lookup_field = "id"



