from django.urls import path
from .views import (
    ListProductsAPIView,
    RetrieveProductAPIView,
    CreateOrderAPIView,
    RetrieveOrderAPIView
)

urlpatterns = [
    path("products/", ListProductsAPIView.as_view(), name="list_products_endpoint"),
    path("products/<int:id>/", RetrieveProductAPIView.as_view(), name="retrieve_product_endpoint"),
    path("orders/create", CreateOrderAPIView.as_view(), name="create_order_endpoint"),
    path("orders/<int:id>", RetrieveOrderAPIView.as_view(), name="retrieve_order_endpoint"),


]
