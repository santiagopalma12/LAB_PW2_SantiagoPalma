from interpreter import draw
from chessPictures import *
tablero = square.negative()
tablero = tablero.join(square)
tablero = tablero.join(tablero)
tablero = tablero.join(tablero)

draw(tablero)