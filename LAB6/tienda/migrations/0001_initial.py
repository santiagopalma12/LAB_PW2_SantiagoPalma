# Generated by Django 5.2.1 on 2025-05-25 02:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=100, unique=True)),
                ('nombre', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.producto')),
            ],
        ),
    ]
