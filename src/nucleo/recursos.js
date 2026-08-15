/** Resuelve la ruta pública de un recurso (imagen o sonido) del aplicativo. */
export function recurso(nombre) {
  return `${import.meta.env.BASE_URL}recursos/${nombre}`
}

export const SONIDOS = {
  clic: 'audio1.wav',
  acierto: 'audio3.wav',
  fallo: 'audio2.wav',
}
