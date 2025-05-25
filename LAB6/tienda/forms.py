from django import forms
from .models import Venta, Producto

class VentaForm(forms.ModelForm):
    codigo_producto = forms.CharField(max_length=100, label="Código del Producto")

    class Meta:
        model = Venta
        fields = ['codigo_producto', 'cantidad'] 

    def clean_codigo_producto(self):
        codigo = self.cleaned_data.get('codigo_producto')
        if not Producto.objects.filter(codigo=codigo).exists():
            raise forms.ValidationError("El producto con este código no existe.")
        return codigo

    def save(self, commit=True):
        codigo = self.cleaned_data.get('codigo_producto')
        producto_obj = Producto.objects.get(codigo=codigo)

        venta = super().save(commit=False)
        venta.producto = producto_obj

        if commit:
            venta.save() 
        return venta