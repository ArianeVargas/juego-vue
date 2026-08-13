<script setup>
import { computed } from 'vue'
import OpcionRespuesta from '@/nucleo/componentes/OpcionRespuesta.vue'

/**
 * Presenta una pregunta con sus opciones. Es el componente que reutilizan
 * los tres módulos: cuentos, ejercicios y evaluación.
 */
const props = defineProps({
  pregunta: { type: Object, required: true },
  seleccion: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  /** 'respondiendo' | 'acierto' | 'fallo' */
  estado: { type: String, default: 'respondiendo' },
  /** Muestra ✓/✕ sobre las opciones al corregir. */
  revelar: { type: Boolean, default: true },
})

defineEmits(['alternar'])

const corregido = computed(() => props.estado !== 'respondiendo')
const esRejilla = computed(() => props.pregunta.tipo === 'imagen')

function marcaDe(indice) {
  if (!corregido.value || !props.revelar) return null
  const esperada = props.pregunta.correctas.includes(indice)
  const elegida = props.seleccion.includes(indice)
  if (esperada) return 'correcta'
  if (elegida) return 'incorrecta'
  return null
}
</script>

<template>
  <div class="panel">
    <h2 class="panel__enunciado">{{ pregunta.enunciado }}</h2>
    <p v-if="pregunta.pista" class="panel__pista">{{ pregunta.pista }}</p>
    <p v-else-if="multiple" class="panel__pista">Puedes marcar varias respuestas.</p>

    <div class="panel__opciones" :class="{ 'panel__opciones--rejilla': esRejilla }">
      <OpcionRespuesta
        v-for="(opcion, i) in pregunta.opciones"
        :key="i"
        :opcion="opcion"
        :indice="i"
        :multiple="multiple"
        :seleccionada="seleccion.includes(i)"
        :marca="marcaDe(i)"
        :bloqueada="corregido"
        @alternar="$emit('alternar', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.panel__enunciado {
  margin: 0 0 0.35rem;
  font-size: clamp(1.15rem, 1rem + 1vw, 1.6rem);
  line-height: 1.3;
  color: var(--color-texto);
}

.panel__pista {
  margin: 0 0 1.1rem;
  color: var(--color-texto-suave);
  font-size: 0.95rem;
}

.panel__opciones {
  display: grid;
  gap: 0.75rem;
}

.panel__opciones--rejilla {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
}
</style>
