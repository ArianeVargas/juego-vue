#!/usr/bin/env python3
"""Genera los iconos PNG de la PWA sin depender de librerías externas.

Dibuja un libro abierto sobre el azul del tema. Se ejecuta con:
    python3 herramientas/generar-iconos.py
"""

import os
import struct
import zlib

DESTINO = os.path.join(os.path.dirname(__file__), "..", "public")

FONDO = (15, 47, 74)
FONDO_ALTO = (29, 80, 116)
PAGINA = (242, 247, 251)
PAGINA_SOMBRA = (198, 216, 231)
LOMO = (247, 150, 70)
RENGLON = (154, 184, 208)


def mezclar(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def entre(v, a, b):
    return a <= v <= b


def color_pixel(u, v):
    """u, v en [0,1]. Devuelve el color RGB del pixel."""
    # Fondo con un degradado diagonal suave.
    fondo = mezclar(FONDO_ALTO, FONDO, min(1.0, (u + v) / 2 + 0.15))

    # Zona del libro.
    if not entre(v, 0.28, 0.78):
        return fondo

    centro = 0.5
    mitad = abs(u - centro)
    if mitad > 0.35 or mitad < 0.008:
        # El hueco central es el lomo.
        if mitad <= 0.008 and entre(v, 0.30, 0.76):
            return LOMO
        return fondo

    # Cuanto más lejos del centro, más caen las tapas.
    caida = (mitad - 0.008) / 0.342
    arriba = 0.30 + 0.06 * caida
    abajo = 0.76 - 0.06 * caida
    if not entre(v, arriba, abajo):
        return fondo

    # Borde inferior de las páginas, un poco más oscuro.
    if v > abajo - 0.035:
        return PAGINA_SOMBRA

    # Renglones de texto.
    alto = abajo - arriba
    rel = (v - arriba) / alto
    for pos in (0.28, 0.45, 0.62, 0.79):
        if abs(rel - pos) < 0.035 and 0.055 < mitad < 0.30:
            return RENGLON

    return PAGINA


def generar(tamano, ruta):
    filas = bytearray()
    for y in range(tamano):
        filas.append(0)  # filtro PNG "None"
        v = (y + 0.5) / tamano
        for x in range(tamano):
            u = (x + 0.5) / tamano
            filas.extend(color_pixel(u, v))

    def fragmento(tipo, datos):
        bloque = tipo + datos
        return struct.pack(">I", len(datos)) + bloque + struct.pack(">I", zlib.crc32(bloque))

    png = (
        b"\x89PNG\r\n\x1a\n"
        + fragmento(b"IHDR", struct.pack(">IIBBBBB", tamano, tamano, 8, 2, 0, 0, 0))
        + fragmento(b"IDAT", zlib.compress(bytes(filas), 9))
        + fragmento(b"IEND", b"")
    )
    with open(ruta, "wb") as archivo:
        archivo.write(png)
    print(f"{os.path.basename(ruta)} — {tamano}x{tamano} — {len(png) / 1024:.1f} KB")


if __name__ == "__main__":
    for tamano in (192, 512):
        generar(tamano, os.path.join(DESTINO, f"icono-{tamano}.png"))
