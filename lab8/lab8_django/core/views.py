from django.shortcuts import get_object_or_404
from .models import Libro
from .utils import render_to_pdf
from django.http import HttpResponse
from django.core.mail import send_mail

def home(request):
    return HttpResponse("Bienvenido a la biblioteca")

def generar_pdf_libro(request, pk):
    libro = get_object_or_404(Libro, pk=pk)
    context = {'libro': libro}
    pdf = render_to_pdf('core/libro_pdf.html', context)
    if pdf:
        response = pdf
        filename = f"detalle_libro_{libro.id}.pdf"
        content = f"inline; filename='{filename}'"
        response['Content-Disposition'] = content
        return response
    return HttpResponse("Error al generar el PDF.")

def enviar_email_prueba(request):
    asunto = '¡Correo de prueba desde Django!'
    mensaje = 'Si lees esto, el envío de correos funciona.'
    remitente = 'noreply@mi-biblioteca.com'
    destinatarios = ['destinatario@ejemplo.com']

    try:
        send_mail(asunto, mensaje, remitente, destinatarios)
        return HttpResponse("Correo 'enviado'. Revisa la consola del servidor.")
    except Exception as e:
        return HttpResponse(f"Error al enviar el correo: {e}")