from colors import *

class Picture:
    def __init__(self, img):
        self.img = img

    def __eq__(self, other):
        return self.img == other.img

    def _invColor(self, color):
        return inverter.get(color, color)

    def verticalMirror(self):
        """ Devuelve el espejo vertical de la imagen """
        vertical = [row[::-1] for row in self.img]
        return Picture(vertical)

    def horizontalMirror(self):
        """ Devuelve el espejo horizontal de la imagen """
        horizontal = self.img[::-1]
        return Picture(horizontal)

    def negative(self):
        """ Devuelve un negativo de la imagen """
        negative_img = [
            ''.join(self._invColor(char) for char in row)
            for row in self.img
        ]
        return Picture(negative_img)

    def join(self, p):
        """ Devuelve una nueva figura poniendo la figura del argumento 
            al lado derecho de la figura actual """
        joined = [
            self_row + p_row
            for self_row, p_row in zip(self.img, p.img)
        ]
        return Picture(joined)

    def up(self, p):
        """ Devuelve una nueva figura poniendo la figura del argumento 
            encima de la figura actual """
        return Picture(p.img + self.img)

    def under(self, p):
        """ Devuelve una nueva figura poniendo la figura p sobre la
            figura actual (prioridad p) """
        new_img = []
        for row_p, row_s in zip(p.img, self.img):
            new_row = ''.join(
                row_p[i] if row_p[i] != ' ' else row_s[i]
                for i in range(len(row_p))
            )
            new_img.append(new_row)
        return Picture(new_img)

    def horizontalRepeat(self, n):
        """ Devuelve una nueva figura repitiendo la figura actual al costado
            la cantidad de veces que indique el valor de n """
        repeated = [
            row * n
            for row in self.img
        ]
        return Picture(repeated)

    def verticalRepeat(self, n):
        """ Repite la imagen n veces hacia abajo """
        return Picture(self.img * n)

    def rotate(self):
        """ Devuelve una figura rotada 90 grados en sentido antihorario """
        rotated = [
            ''.join(row[i] for row in self.img[::-1])
            for i in range(len(self.img[0]))
        ]
        return Picture(rotated)
