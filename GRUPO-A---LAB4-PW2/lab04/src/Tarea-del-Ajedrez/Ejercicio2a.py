from interpreter import draw
from chessPictures import *

caballos1 = knight.negative().join(knight)
caballos2 = knight.join(knight.negative())
caballos3 = caballos1.up(caballos2)
draw(caballos3)
