import { ref, watch } from 'vue'
import { recurso, SONIDOS } from '@/nucleo/recursos'

const CLAVE = 'cuentos:sonido'
const activo = ref(localStorage.getItem(CLAVE) !== 'off')
const cache = new Map()

watch(activo, (valor) => localStorage.setItem(CLAVE, valor ? 'on' : 'off'))

function obtener(nombre) {
  if (!cache.has(nombre)) {
    const audio = new Audio(recurso(nombre))
    audio.preload = 'auto'
    cache.set(nombre, audio)
  }
  return cache.get(nombre)
}

/**
 * Sonidos del aplicativo original (audio1/2/3.wav del PowerPoint).
 * Se puede silenciar; la preferencia queda guardada en el navegador.
 */
export function usarSonido() {
  function reproducir(clave) {
    if (!activo.value) return
    const nombre = SONIDOS[clave]
    if (!nombre) return
    const audio = obtener(nombre)
    audio.currentTime = 0
    // Algunos navegadores rechazan la reproducción sin interacción previa.
    audio.play().catch(() => {})
  }

  return {
    activo,
    reproducir,
    alternar: () => (activo.value = !activo.value),
  }
}
