from django.shortcuts import render
from .models import DestinosTuristicos 
from .forms import DestinoForm
from django.contrib.auth.decorators import login_required 
from django.contrib import messages
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404


def index(request):
    destinos = DestinosTuristicos.objects.all() 
    context = {'destinos': destinos}
    return render(request, 'index.html', context)

@login_required 
def agregar_destino(request):
    if request.method == 'POST':
        form = DestinoForm(request.POST, request.FILES) 
        if form.is_valid():
            form.save()
            messages.success(request, '¡Destino agregado exitosamente!')
            return redirect('index') 
    else:
        form = DestinoForm()
    return render(request, 'destinos_app/destino_form.html', {'form': form, 'accion': 'Agregar'})

@login_required
def modificar_destino(request, pk):
    destino = get_object_or_404(DestinosTuristicos, pk=pk)
    if request.method == 'POST':
        form = DestinoForm(request.POST, request.FILES, instance=destino)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Destino modificado exitosamente!')
            return redirect('index')
    else:
        form = DestinoForm(instance=destino)
    return render(request, 'destinos_app/destino_form.html', {'form': form, 'accion': 'Modificar', 'destino': destino})

@login_required
def eliminar_destino(request, pk):
    destino = get_object_or_404(DestinosTuristicos, pk=pk)
    if request.method == 'POST': 
        destino.delete()
        messages.success(request, '¡Destino eliminado exitosamente!')
        return redirect('index')
    return render(request, 'destinos_app/destino_confirm_delete.html', {'destino': destino})

def listar_destinos(request): 
    destinos = DestinosTuristicos.objects.all()
    return render(request, 'destinos_app/eliminar_confirm.html', {'form': form, 'accion': 'Eliminar', 'destino': destino})