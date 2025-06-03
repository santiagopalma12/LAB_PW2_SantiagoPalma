from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('destinos/agregar/', views.agregar_destino, name='agregar_destino'),
    path('destinos/<int:pk>/modificar/', views.modificar_destino, name='modificar_destino'),
    path('destinos/<int:pk>/eliminar/', views.eliminar_destino, name='eliminar_destino'),
    path('destinos/listar/', views.listar_destinos, name='listar_destinos'), 
]
