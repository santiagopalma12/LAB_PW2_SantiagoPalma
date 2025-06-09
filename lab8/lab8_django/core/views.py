from django.shortcuts import get_object_or_404
from .models import Libro
from .utils import render_to_pdf

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