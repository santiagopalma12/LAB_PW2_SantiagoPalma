from django.urls import path
from .views import generar_pdf_libro

app_name = 'core'
urlpatterns = [
    path('libro/<int:pk>/pdf/', generar_pdf_libro, name='libro_pdf'),
]