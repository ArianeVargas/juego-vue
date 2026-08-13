<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PantallaJuego from '@/nucleo/componentes/PantallaJuego.vue'
import PanelPregunta from '@/nucleo/componentes/PanelPregunta.vue'
import BarraProgreso from '@/nucleo/componentes/BarraProgreso.vue'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'
import ResumenResultados from '@/nucleo/componentes/ResumenResultados.vue'
import { preguntasEvaluacion } from '@/modulos/evaluacion/datos/evaluacion'
import { usarCuestionario } from '@/nucleo/composables/usarCuestionario'
import { usarProgreso } from '@/nucleo/almacen/progreso'

const router = useRouter()
const { registrarEvaluacion } = usarProgreso()
const revision = ref(false)

/**
 * A diferencia de los cuentos, la evaluación no corrige sobre la marcha:
 * se responde entera y al final se muestra la nota, como en el original.
 */
const {
  indice,
  pregunta,
  total,
  seleccion,
  estado,
  esMultiple,
  aciertos,
  historial,
  terminado,
  puedeComprobar,
  alternarOpcion,
  comprobar,
  retroceder,
  reiniciar,
} = usarCuestionario(preguntasEvaluacion, { retroInmediata: false })

watch(terminado, (fin) => {
  if (fin) registrarEvaluacion(aciertos.value, total.value)
})

const revisiones = computed(() =>
  preguntasEvaluacion.map((preg, i) => ({
    preg,
    respuesta: historial.value.find((r) => r.indice === i),
  })),
)

function reintentarTodo() {
  revision.value = false
  reiniciar()
}
</script>

<template>
  <PantallaJuego
    titulo="Evaluación final"
    :subtitulo="terminado ? 'Resultados' : `Pregunta ${indice + 1} de ${total}`"
    acento="#4bacc6"
  >
    <!-- Resultados -->
    <template v-if="terminado && !revision">
      <ResumenResultados
        :aciertos="aciertos"
        :total="total"
        titulo="Felicidades, terminaste tu evaluación"
        con-nota
      >
        <BotonJuego variante="secundario" icono="🔍" @click="revision = true">
          Revisar respuestas
        </BotonJuego>
        <BotonJuego variante="fantasma" icono="↺" @click="reintentarTodo">
          Repetir evaluación
        </BotonJuego>
        <BotonJuego icono="🏠" @click="router.push({ name: 'menu' })">Volver al menú</BotonJuego>
      </ResumenResultados>
    </template>

    <!-- Revisión pregunta a pregunta -->
    <template v-else-if="terminado && revision">
      <ol class="revision">
        <li
          v-for="(item, i) in revisiones"
          :key="i"
          class="revision__item"
          :class="item.respuesta?.acertada ? 'revision__item--ok' : 'revision__item--mal'"
        >
          <p class="revision__enunciado">
            <span class="revision__estado" aria-hidden="true">
              {{ item.respuesta?.acertada ? '✓' : '✕' }}
            </span>
            {{ item.preg.enunciado }}
          </p>
          <p class="revision__respuesta">
            Respuesta correcta:
            <strong>
              {{
                item.preg.opciones[item.preg.correctas[0]].texto ??
                item.preg.opciones[item.preg.correctas[0]].alt
              }}
            </strong>
          </p>
        </li>
      </ol>
      <div class="revision__acciones">
        <BotonJuego icono="←" @click="revision = false">Volver a los resultados</BotonJuego>
      </div>
    </template>

    <!-- Cuestionario -->
    <template v-else>
      <BarraProgreso
        class="evaluacion__progreso"
        :actual="indice"
        :total="total"
        etiqueta="Preguntas contestadas"
      />

      <PanelPregunta
        :pregunta="pregunta"
        :seleccion="seleccion"
        :multiple="esMultiple"
        :estado="estado"
        :revelar="false"
        @alternar="alternarOpcion"
      />

      <p class="evaluacion__nota">
        En la evaluación no se corrige pregunta a pregunta: al terminar verás tu nota.
      </p>
    </template>

    <template #pie>
      <div class="evaluacion__pie">
        <BotonJuego
          v-if="!terminado"
          variante="fantasma"
          icono="←"
          :deshabilitado="indice === 0"
          @click="retroceder"
        >
          Anterior
        </BotonJuego>
        <BotonJuego
          v-if="!terminado"
          tamano="grande"
          :icono="indice + 1 >= total ? '🏁' : '→'"
          :deshabilitado="!puedeComprobar"
          @click="comprobar"
        >
          {{ indice + 1 >= total ? 'Terminar' : 'Siguiente' }}
        </BotonJuego>
      </div>
    </template>
  </PantallaJuego>
</template>

<style scoped>
.evaluacion__progreso {
  margin-bottom: 1.75rem;
}

.evaluacion__nota {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--color-texto-suave);
}

.evaluacion__pie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.revision {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.revision__item {
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  border-left: 5px solid;
  background: var(--color-superficie);
}

.revision__item--ok {
  border-left-color: var(--color-exito);
}

.revision__item--mal {
  border-left-color: var(--color-error);
}

.revision__enunciado {
  margin: 0;
  font-weight: 700;
  line-height: 1.45;
}

.revision__estado {
  margin-right: 0.4rem;
  font-weight: 900;
}

.revision__item--ok .revision__estado {
  color: var(--color-exito);
}

.revision__item--mal .revision__estado {
  color: var(--color-error);
}

.revision__respuesta {
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  color: var(--color-texto-suave);
}

.revision__acciones {
  margin-top: 1.5rem;
}
</style>
