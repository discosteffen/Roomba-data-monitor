#!/usr/bin/python
# coding: utf-8


#----------------------------------------------------------------
# Autor: Saymon C. A. Oliveira
# Email: saymowan@gmail.com
# Descrição: este algoritmo descreve a sexta implementação de OpenCV
# Funções: Imagem digital -> Transformação HSV -> Imagem binária -> Erosão binária -> Encontrar área -> Encontrar coordenadas
# Tecnologias: OpenCV, Python e NumPy
#---------------------------------------------------------------


import cv2.cv as cv
import cv2 as cv2
import time
import numpy as np
import sys

#import RPi.GPIO as gpio



# Faixa de HSV que usamos para detectar o objeto colorido
# Neste exemplo, pré definidos para uma bola verde
#Hmin = 42
#Hmax = 92
#Smin = 62
#Smax = 255
#Vmin = 63
#Vmax = 235

##
#158
##36
#28
#


#Padrão RED
Hmin = 0
Hmax = 120
Smin = 171
Smax = 255
Vmin = 126
Vmax = 255


 # Cria-se um array de valores HSV(mínimo e máximo)
rangeMin = np.array([Hmin, Smin, Vmin], np.uint8)
rangeMax = np.array([Hmax, Smax, Vmax], np.uint8)

# Área mínima á ser detectada
minArea = 50

cv.NamedWindow("Entrada")
cv.NamedWindow("HSV")
cv.NamedWindow("Thre")
cv.NamedWindow("Erosao")

def main():
    capture = cv2.VideoCapture(0)

    # Parametros do tamannho da imagem de captura
    width = 640
    height = 480

    # Definir um tamanho para os frames (descartando o PyramidDown
    if capture.isOpened():
      capture.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH, width)
      capture.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT, height)


    while True:
        ret, entrada = capture.read()
        imgHSV = cv2.cvtColor(entrada,cv2.cv.CV_BGR2HSV)
        imgThresh = cv2.inRange(imgHSV, rangeMin, rangeMax)
        imgErode = cv2.erode(imgThresh, None, iterations = 3)
        moments = cv2.moments(imgErode, True)
        if moments['m00'] >= minArea:
           x = moments['m10'] / moments['m00']
           y = moments['m01'] / moments['m00']
           #print(x, ", ", y)
           #sets size of cirlce.. can use this to determine stuff.
           cv2.circle(entrada, (int(x), int(y)), 50, (0, 255, 0), -1)
           #lines_sum = x
           #print("x: ", x, "y: ", y)
           print (x, y)
           sys.stdout.flush()

        cv2.imshow("Entrada",entrada)
        cv2.imshow("HSV", imgHSV)
        cv2.imshow("Thre", imgThresh)
        cv2.imshow("Erosao", imgErode)

        if cv.WaitKey(10) == 27:
            break
    cv.DestroyAllWindows()


if __name__ == '__main__':
    main()
