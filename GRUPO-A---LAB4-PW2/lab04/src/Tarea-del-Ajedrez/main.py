import sys
sys.path.append('./Tarea-del-Ajedrez')

from chessPictures import rock
from interpreter import draw

# p ya es un Picture, no necesitas volver a envolverlo
p = rock

# Pruebas
draw(p.verticalMirror())         # Espejo vertical
draw(p.horizontalMirror())       # Espejo horizontal
draw(p.negative())               # Negativo
draw(p.join(p))                  # Dos rocas juntas
draw(p.up(p))                    # Una roca encima de otra
draw(p.under(p.negative()))      # Negativo sobre roca
draw(p.horizontalRepeat(3))      # Roca repetida 3 veces a lo ancho
draw(p.verticalRepeat(2))        # Roca repetida 2 veces a lo alto
draw(p.rotate())                 # Roca rotada
