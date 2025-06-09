from django.urls import path
from .views import generar_pdf_libro, home

app_name = 'core'

urlpatterns = [
    path('', home, name='home'),  
    path('libro/<int:pk>/pdf/', generar_pdf_libro, name='libro_pdf'),
]
