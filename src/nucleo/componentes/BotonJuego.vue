<script setup>
import { computed } from 'vue'
import { usarSonido } from '@/nucleo/composables/usarSonido'

const props = defineProps({
  variante: { type: String, default: 'primario' }, // primario | secundario | fantasma
  tamano: { type: String, default: 'medio' }, // medio | grande
  icono: { type: String, default: '' },
  deshabilitado: { type: Boolean, default: false },
  silencioso: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])
const { reproducir } = usarSonido()

const clases = computed(() => ['boton', `boton--${props.variante}`, `boton--${props.tamano}`])

function alPulsar(evento) {
  if (props.deshabilitado) return
  if (!props.silencioso) reproducir('clic')
  emit('click', evento)
}
</script>

<template>
  <button type="button" :class="clases" :disabled="deshabilitado" @click="alPulsar">
    <span v-if="icono" class="boton__icono" aria-hidden="true">{{ icono }}</span>
    <span class="boton__texto"><slot /></span>
  </button>
</template>

<style scoped>
.boton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.boton:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.boton:not(:disabled):hover {
  transform: translateY(-2px);
}

.boton:not(:disabled):active {
  transform: translateY(1px);
}

.boton:focus-visible {
  outline: 3px solid var(--color-foco);
  outline-offset: 3px;
}

.boton--medio {
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
}

.boton--grande {
  padding: 1rem 2.2rem;
  font-size: 1.2rem;
}

.boton--primario {
  background: var(--color-acento);
  color: #fff;
  box-shadow: 0 6px 0 var(--color-acento-sombra);
}

.boton--primario:not(:disabled):hover {
  background: var(--color-acento-claro);
}

.boton--secundario {
  background: var(--color-superficie-alta);
  color: var(--color-texto);
  box-shadow: 0 4px 0 rgb(0 0 0 / 0.25);
}

.boton--fantasma {
  background: transparent;
  color: var(--color-texto-suave);
  box-shadow: inset 0 0 0 2px var(--color-borde);
}

.boton--fantasma:not(:disabled):hover {
  color: var(--color-texto);
  box-shadow: inset 0 0 0 2px var(--color-texto-suave);
}

.boton__icono {
  font-size: 1.15em;
  line-height: 1;
}
</style>
