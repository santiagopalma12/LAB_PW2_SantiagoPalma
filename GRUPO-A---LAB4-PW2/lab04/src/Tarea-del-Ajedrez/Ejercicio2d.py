from interpreter import draw
from chessPictures import *
tablero = square
tablero = tablero.join(square.negative())
tablero = tablero.join(tablero)
tablero = tablero.join(tablero)
draw(tablero)