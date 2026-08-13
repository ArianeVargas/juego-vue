/** Resuelve la ruta pública de un recurso (imagen o sonido) del aplicativo. */
export function recurso(nombre) {
  return `${import.meta.env.BASE_URL}recursos/${nombre}`
}

export const SONIDOS = {
  clic: 'audio1.wav',
  acierto: 'audio2.wav',
  fallo: 'audio3.wav',
}
