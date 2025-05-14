from interpreter import draw
from chessPictures import *
from picture import *

from interpreter import draw
from chessPictures import * 

piezas_orden_correcto = [rock, knight, bishop, queen, king, bishop, knight, rock]

def crear_fila_de_casillas_con_piezas(es_fila_principal, pieza_para_peones, empieza_casilla_clara):
    fila_construida = None
    for i in range(8):

        if empieza_casilla_clara:
            casilla_base_actual = square if (i % 2 == 0) else square.negative()
        else:
             casilla_base_actual = square.negative() if (i % 2 == 0) else square
        
        if es_fila_principal:
            pieza_actual = piezas_orden_correcto[i]
        else:
            pieza_actual = pieza_para_peones 
        
        casilla_con_pieza = casilla_base_actual.under(pieza_actual)
        
        if fila_construida is None:
            fila_construida = casilla_con_pieza
        else:
            fila_construida = fila_construida.join(casilla_con_pieza)
            
    return fila_construida

def crear_fila_de_casillas_vacias(empieza_casilla_clara):
    fila_construida = None
    for i in range(8):
        if empieza_casilla_clara:
            casilla_actual = square if (i % 2 == 0) else square.negative()
        else:
            casilla_actual = square.negative() if (i % 2 == 0) else square
            
        if fila_construida is None:
            fila_construida = casilla_actual
        else:
            fila_construida = fila_construida.join(casilla_actual)
            
    return fila_construida

fila_R1_piezas_blancas = crear_fila_de_casillas_con_piezas(
    es_fila_principal=True, 
    pieza_para_peones=None, 
    empieza_casilla_clara=True
)

fila_R2_peones_blancos = crear_fila_de_casillas_con_piezas(
    es_fila_principal=False, 
    pieza_para_peones=pawn, 
    empieza_casilla_clara=False
)

fila_R3_vacia = crear_fila_de_casillas_vacias(empieza_casilla_clara=True)

fila_R4_vacia = crear_fila_de_casillas_vacias(empieza_casilla_clara=False)

fila_R5_vacia = crear_fila_de_casillas_vacias(empieza_casilla_clara=True)

fila_R6_vacia = crear_fila_de_casillas_vacias(empieza_casilla_clara=False)

base_fila_R7_peones_negras = crear_fila_de_casillas_con_piezas(
    es_fila_principal=False, 
    pieza_para_peones=pawn, 
    empieza_casilla_clara=True
)
fila_R7_peones_negras = base_fila_R7_peones_negras.negative()

base_fila_R8_piezas_negras = crear_fila_de_casillas_con_piezas(
    es_fila_principal=True, 
    pieza_para_peones=None, 
    empieza_casilla_clara=False
)
fila_R8_piezas_negras = base_fila_R8_piezas_negras.negative()
fila_extra_1_debajo_R1 = crear_fila_de_casillas_vacias(empieza_casilla_clara=False)

fila_extra_2_debajo_R1 = crear_fila_de_casillas_vacias(empieza_casilla_clara=True)

tablero = fila_extra_2_debajo_R1               
tablero = tablero.up(fila_extra_1_debajo_R1)   
tablero = tablero.up(fila_R1_piezas_blancas)   
tablero = tablero.up(fila_R2_peones_blancos)   
tablero = tablero.up(fila_R3_vacia)
tablero = tablero.up(fila_R4_vacia)
tablero = tablero.up(fila_R5_vacia)
tablero = tablero.up(fila_R6_vacia)
tablero = tablero.up(fila_R7_peones_negras)
tablero = tablero.up(fila_R8_piezas_negras)    

draw(tablero)

