import { computed, reactive, watch } from 'vue'

const CLAVE = 'cuentos:progreso'

function cargar() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? {}
  } catch {
    return {}
  }
}

/**
 * Estado global del avance del estudiante. Es un simple objeto reactivo
 * (no hace falta Pinia) que se persiste en localStorage, de modo que el
 * progreso sobrevive al cierre de la aplicación y funciona sin conexión.
 */
const estado = reactive({
  cuentos: {},
  ejercicios: { aciertos: 0, completado: false },
  evaluacion: { nota: null, aciertos: 0, total: 0, fecha: null },
  ...cargar(),
})

watch(estado, (valor) => localStorage.setItem(CLAVE, JSON.stringify(valor)), { deep: true })

export function usarProgreso() {
  function registrarCuento(idCuento, aciertos, total) {
    const previo = estado.cuentos[idCuento]
    if (!previo || aciertos > previo.aciertos) {
      estado.cuentos[idCuento] = { aciertos, total, completado: true }
    }
  }

  function registrarEjercicios(aciertos, total) {
    if (aciertos > estado.ejercicios.aciertos) {
      estado.ejercicios = { aciertos, total, completado: true }
    }
  }

  function registrarEvaluacion(aciertos, total) {
    estado.evaluacion = {
      aciertos,
      total,
      nota: Math.round((aciertos / total) * 500) / 100,
      fecha: new Date().toISOString(),
    }
  }

  function reiniciar() {
    estado.cuentos = {}
    estado.ejercicios = { aciertos: 0, completado: false }
    estado.evaluacion = { nota: null, aciertos: 0, total: 0, fecha: null }
  }

  const cuentosCompletados = computed(
    () => Object.values(estado.cuentos).filter((c) => c.completado).length,
  )

  return {
    estado,
    cuentosCompletados,
    registrarCuento,
    registrarEjercicios,
    registrarEvaluacion,
    reiniciar,
  }
}
