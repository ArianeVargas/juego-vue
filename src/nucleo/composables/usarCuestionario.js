import { computed, ref } from 'vue'
import { usarSonido } from '@/nucleo/composables/usarSonido'

/**
 * Motor de cuestionarios compartido por los tres módulos del juego
 * (cuentos, ejercicios y evaluación).
 *
 * Soporta pregunta de respuesta única y de selección múltiple, y dos modos
 * de corrección: inmediata (como el PowerPoint original, que saltaba a una
 * diapositiva de «Felicidades» o «Debes leer mejor») o diferida hasta el final.
 *
 * @param {import('vue').Ref<Array>|Array} preguntas
 * @param {{ retroInmediata?: boolean }} opciones
 */
export function usarCuestionario(preguntas, { retroInmediata = true } = {}) {
  const lista = computed(() => (Array.isArray(preguntas) ? preguntas : preguntas.value))
  const { reproducir } = usarSonido()

  const indice = ref(0)
  const seleccion = ref([])
  const estado = ref('respondiendo') // 'respondiendo' | 'acierto' | 'fallo'
  const historial = ref([])
  const terminado = ref(false)

  const pregunta = computed(() => lista.value[indice.value] ?? null)
  const total = computed(() => lista.value.length)
  const esMultiple = computed(() => (pregunta.value?.correctas.length ?? 0) > 1)
  const aciertos = computed(() => historial.value.filter((r) => r.acertada).length)
  const progreso = computed(() => (total.value ? (indice.value / total.value) * 100 : 0))
  const puedeComprobar = computed(
    () => estado.value === 'respondiendo' && seleccion.value.length > 0,
  )

  function alternarOpcion(i) {
    if (estado.value !== 'respondiendo') return
    if (esMultiple.value) {
      const pos = seleccion.value.indexOf(i)
      if (pos === -1) seleccion.value.push(i)
      else seleccion.value.splice(pos, 1)
    } else {
      seleccion.value = [i]
    }
  }

  function esAcertada() {
    const esperadas = [...pregunta.value.correctas].sort()
    const dadas = [...seleccion.value].sort()
    return (
      esperadas.length === dadas.length && esperadas.every((valor, i) => valor === dadas[i])
    )
  }

  function comprobar() {
    if (!puedeComprobar.value) return
    const acertada = esAcertada()

    historial.value = [
      ...historial.value.filter((r) => r.indice !== indice.value),
      { indice: indice.value, seleccion: [...seleccion.value], acertada },
    ]

    if (retroInmediata) {
      estado.value = acertada ? 'acierto' : 'fallo'
      reproducir(acertada ? 'acierto' : 'fallo')
    } else {
      avanzar()
    }
  }

  /** Vuelve a intentar la misma pregunta (solo en corrección inmediata). */
  function reintentar() {
    seleccion.value = []
    estado.value = 'respondiendo'
  }

  function avanzar() {
    if (indice.value + 1 >= total.value) {
      terminado.value = true
      return
    }
    indice.value += 1
    seleccion.value = []
    estado.value = 'respondiendo'
  }

  function retroceder() {
    if (indice.value === 0) return
    indice.value -= 1
    const previo = historial.value.find((r) => r.indice === indice.value)
    seleccion.value = previo ? [...previo.seleccion] : []
    estado.value = 'respondiendo'
  }

  function reiniciar() {
    indice.value = 0
    seleccion.value = []
    estado.value = 'respondiendo'
    historial.value = []
    terminado.value = false
  }

  return {
    indice,
    pregunta,
    total,
    seleccion,
    estado,
    esMultiple,
    aciertos,
    progreso,
    historial,
    terminado,
    puedeComprobar,
    alternarOpcion,
    comprobar,
    reintentar,
    avanzar,
    retroceder,
    reiniciar,
  }
}
