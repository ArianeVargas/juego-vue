<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import PantallaJuego from '@/nucleo/componentes/PantallaJuego.vue'
import PanelPregunta from '@/nucleo/componentes/PanelPregunta.vue'
import AvisoRetroalimentacion from '@/nucleo/componentes/AvisoRetroalimentacion.vue'
import BarraProgreso from '@/nucleo/componentes/BarraProgreso.vue'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'
import ResumenResultados from '@/nucleo/componentes/ResumenResultados.vue'
import FraseCompletar from '@/modulos/ejercicios/componentes/FraseCompletar.vue'
import { ejercicios } from '@/modulos/ejercicios/datos/ejercicios'
import { usarCuestionario } from '@/nucleo/composables/usarCuestionario'
import { usarProgreso } from '@/nucleo/almacen/progreso'

const router = useRouter()
const { registrarEjercicios } = usarProgreso()

// Se adaptan los ejercicios al formato común de pregunta.
const preguntas = computed(() =>
  ejercicios.map((ejercicio) => ({
    enunciado: 'Completa la frase con la opción correcta…',
    tipo: 'texto',
    opciones: ejercicio.opciones.map((texto) => ({ texto })),
    correctas: [ejercicio.correcta],
  })),
)

const {
  indice,
  pregunta,
  total,
  seleccion,
  estado,
  aciertos,
  terminado,
  puedeComprobar,
  alternarOpcion,
  comprobar,
  reintentar,
  avanzar,
  reiniciar,
} = usarCuestionario(preguntas, { retroInmediata: true })

const ejercicioActual = computed(() => ejercicios[indice.value])
const relleno = computed(() => ejercicioActual.value?.opciones[ejercicioActual.value.correcta])

watch(terminado, (fin) => {
  if (fin) registrarEjercicios(aciertos.value, total.value)
})
</script>

<template>
  <PantallaJuego
    titulo="Ejercicios"
    :subtitulo="terminado ? 'Resultados' : `Frase ${indice + 1} de ${total}`"
    acento="#f79646"
  >
    <template v-if="terminado">
      <ResumenResultados
        :aciertos="aciertos"
        :total="total"
        titulo="Terminaste los ejercicios"
      >
        <BotonJuego variante="secundario" icono="↺" @click="reiniciar">Repetir</BotonJuego>
        <BotonJuego icono="🏅" @click="router.push({ name: 'evaluacion' })">
          Ir a la evaluación
        </BotonJuego>
      </ResumenResultados>
    </template>

    <template v-else>
      <BarraProgreso
        class="ejercicios__progreso"
        :actual="indice"
        :total="total"
        etiqueta="Frases completadas"
      />

      <FraseCompletar
        :frase="ejercicioActual.frase"
        :relleno="relleno"
        :acertada="estado === 'acierto'"
      />

      <PanelPregunta
        :pregunta="pregunta"
        :seleccion="seleccion"
        :estado="estado"
        @alternar="alternarOpcion"
      />

      <AvisoRetroalimentacion v-if="estado !== 'respondiendo'" :estado="estado">
        <BotonJuego v-if="estado === 'fallo'" variante="secundario" icono="↺" @click="reintentar">
          Intentar de nuevo
        </BotonJuego>
        <BotonJuego icono="→" @click="avanzar">
          {{ indice + 1 >= total ? 'Ver resultados' : 'Siguiente' }}
        </BotonJuego>
      </AvisoRetroalimentacion>
    </template>

    <template #pie>
      <div class="ejercicios__pie">
        <BotonJuego
          v-if="!terminado && estado === 'respondiendo'"
          tamano="grande"
          icono="✓"
          :deshabilitado="!puedeComprobar"
          @click="comprobar"
        >
          Comprobar
        </BotonJuego>
      </div>
    </template>
  </PantallaJuego>
</template>

<style scoped>
.ejercicios__progreso {
  margin-bottom: 1.75rem;
}

.ejercicios__pie {
  display: flex;
  justify-content: flex-end;
}
</style>
