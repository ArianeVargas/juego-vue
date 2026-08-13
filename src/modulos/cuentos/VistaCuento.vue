<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PantallaJuego from '@/nucleo/componentes/PantallaJuego.vue'
import PanelPregunta from '@/nucleo/componentes/PanelPregunta.vue'
import AvisoRetroalimentacion from '@/nucleo/componentes/AvisoRetroalimentacion.vue'
import BarraProgreso from '@/nucleo/componentes/BarraProgreso.vue'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'
import ResumenResultados from '@/nucleo/componentes/ResumenResultados.vue'
import LecturaCuento from '@/modulos/cuentos/componentes/LecturaCuento.vue'
import { cuentos, obtenerCuento } from '@/modulos/cuentos/datos/cuentos'
import { usarCuestionario } from '@/nucleo/composables/usarCuestionario'
import { usarProgreso } from '@/nucleo/almacen/progreso'

const route = useRoute()
const router = useRouter()
const { registrarCuento } = usarProgreso()

const cuento = computed(() => obtenerCuento(route.params.id))
const preguntas = computed(() => cuento.value?.preguntas ?? [])
const fase = ref('lectura') // 'lectura' | 'preguntas'

const cuestionario = usarCuestionario(preguntas, { retroInmediata: true })
const {
  indice,
  pregunta,
  total,
  seleccion,
  estado,
  esMultiple,
  aciertos,
  terminado,
  puedeComprobar,
  alternarOpcion,
  comprobar,
  reintentar,
  avanzar,
  reiniciar,
} = cuestionario

const siguienteCuento = computed(() => {
  const pos = cuentos.findIndex((c) => c.id === cuento.value?.id)
  return pos >= 0 && pos + 1 < cuentos.length ? cuentos[pos + 1] : null
})

// Cambiar de cuento sin salir de la ruta reinicia la actividad.
watch(
  () => route.params.id,
  () => {
    fase.value = 'lectura'
    reiniciar()
  },
)

watch(terminado, (fin) => {
  if (fin && cuento.value) registrarCuento(cuento.value.id, aciertos.value, total.value)
})

function volverALeer() {
  fase.value = 'lectura'
}

function repetir() {
  reiniciar()
  fase.value = 'preguntas'
}
</script>

<template>
  <PantallaJuego
    v-if="cuento"
    :titulo="cuento.titulo"
    :subtitulo="fase === 'lectura' ? 'Lectura' : `Pregunta ${indice + 1} de ${total}`"
    :acento="cuento.acento"
  >
    <!-- 1. Lectura -->
    <template v-if="fase === 'lectura'">
      <LecturaCuento :cuento="cuento" />
    </template>

    <!-- 3. Resumen -->
    <template v-else-if="terminado">
      <ResumenResultados
        :aciertos="aciertos"
        :total="total"
        :titulo="`Terminaste «${cuento.titulo}»`"
      >
        <BotonJuego icono="↺" variante="secundario" @click="repetir">
          Repetir preguntas
        </BotonJuego>
        <BotonJuego
          v-if="siguienteCuento"
          icono="→"
          @click="router.push({ name: 'cuento', params: { id: siguienteCuento.id } })"
        >
          Siguiente: {{ siguienteCuento.titulo }}
        </BotonJuego>
        <BotonJuego v-else icono="🏅" @click="router.push({ name: 'evaluacion' })">
          Ir a la evaluación
        </BotonJuego>
      </ResumenResultados>
    </template>

    <!-- 2. Preguntas -->
    <template v-else>
      <BarraProgreso
        class="cuento__progreso"
        :actual="indice"
        :total="total"
        etiqueta="Preguntas respondidas"
      />

      <PanelPregunta
        :pregunta="pregunta"
        :seleccion="seleccion"
        :multiple="esMultiple"
        :estado="estado"
        @alternar="alternarOpcion"
      />

      <AvisoRetroalimentacion v-if="estado !== 'respondiendo'" :estado="estado">
        <BotonJuego v-if="estado === 'fallo'" variante="secundario" icono="↺" @click="reintentar">
          Intentar de nuevo
        </BotonJuego>
        <BotonJuego v-if="estado === 'fallo'" variante="fantasma" icono="📖" @click="volverALeer">
          Volver a leer
        </BotonJuego>
        <BotonJuego icono="→" @click="avanzar">
          {{ indice + 1 >= total ? 'Ver resultados' : 'Siguiente' }}
        </BotonJuego>
      </AvisoRetroalimentacion>
    </template>

    <template #pie>
      <div class="cuento__pie">
        <BotonJuego
          v-if="fase === 'preguntas' && !terminado"
          variante="fantasma"
          icono="📖"
          @click="volverALeer"
        >
          Releer el cuento
        </BotonJuego>

        <BotonJuego
          v-if="fase === 'lectura'"
          tamano="grande"
          icono="✏️"
          @click="fase = 'preguntas'"
        >
          {{ indice > 0 || estado !== 'respondiendo' ? 'Volver a las preguntas' : 'Comenzar las preguntas' }}
        </BotonJuego>

        <BotonJuego
          v-else-if="!terminado && estado === 'respondiendo'"
          tamano="grande"
          :deshabilitado="!puedeComprobar"
          icono="✓"
          @click="comprobar"
        >
          Comprobar
        </BotonJuego>
      </div>
    </template>
  </PantallaJuego>

  <PantallaJuego v-else titulo="Cuento no encontrado">
    <p>Ese cuento no existe. Vuelve al menú de contenido para elegir otro.</p>
  </PantallaJuego>
</template>

<style scoped>
.cuento__progreso {
  margin-bottom: 1.75rem;
}

.cuento__pie {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.cuento__pie > :only-child {
  margin-left: auto;
}
</style>
