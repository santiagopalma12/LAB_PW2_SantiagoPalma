from django.urls import path
from .views import generar_pdf_libro, enviar_email_prueba

app_name = 'core'

urlpatterns = [
    path('libro/<int:pk>/pdf/', generar_pdf_libro, name='libro_pdf'),
    path('enviar-email/', enviar_email_prueba, name='enviar_email'), # <-- Añadir
]
