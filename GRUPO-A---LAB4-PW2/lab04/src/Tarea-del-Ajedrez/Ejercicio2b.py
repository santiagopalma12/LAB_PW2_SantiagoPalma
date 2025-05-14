from interpreter import draw
from chessPictures import *

caballo1a = knight.verticalMirror()
caballo1b = knight.verticalMirror()
caballos1 = caballo1a.negative().join(caballo1b)

caballos2 = knight.join(knight.negative())
caballos3 = caballos1.up(caballos2)
draw(caballos3)

