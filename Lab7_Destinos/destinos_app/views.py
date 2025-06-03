from django.shortcuts import render
from .models import DestinosTuristicos # Importar el modelo

def index(request):
    destinos = DestinosTuristicos.objects.all() # Obtener todos los destinos
    context = {'destinos': destinos}
    return render(request, 'index.html', context)