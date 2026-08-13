<script setup>
import { computed } from 'vue'
import ImagenDuotono from '@/nucleo/componentes/ImagenDuotono.vue'

const props = defineProps({
  opcion: { type: Object, required: true },
  indice: { type: Number, required: true },
  seleccionada: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  /** null mientras se responde; 'correcta' | 'incorrecta' al corregir. */
  marca: { type: String, default: null },
  bloqueada: { type: Boolean, default: false },
})

defineEmits(['alternar'])

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F']

const esImagen = computed(() => Boolean(props.opcion.imagen))
const clases = computed(() => [
  'opcion',
  esImagen.value ? 'opcion--imagen' : 'opcion--texto',
  {
    'opcion--activa': props.seleccionada,
    'opcion--correcta': props.marca === 'correcta',
    'opcion--incorrecta': props.marca === 'incorrecta',
  },
])
</script>

<template>
  <button
    type="button"
    :class="clases"
    :disabled="bloqueada"
    :aria-pressed="seleccionada"
    @click="$emit('alternar', indice)"
  >
    <span class="opcion__marca" :class="{ 'opcion__marca--redonda': !multiple }">
      <template v-if="marca === 'correcta'">✓</template>
      <template v-else-if="marca === 'incorrecta'">✕</template>
      <template v-else>{{ LETRAS[indice] }}</template>
    </span>

    <span class="opcion__contenido">
      <ImagenDuotono
        v-if="esImagen"
        :imagen="opcion.imagen"
        :duotono="opcion.duotono"
        :alt="opcion.alt || `Opción ${LETRAS[indice]}`"
      />
      <span v-else class="opcion__texto">{{ opcion.texto }}</span>
    </span>
  </button>
</template>

<style scoped>
.opcion {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 3px solid var(--color-borde);
  border-radius: 1.1rem;
  background: var(--color-superficie-alta);
  color: var(--color-texto);
  font-family: inherit;
  font-size: 1.05rem;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.opcion:not(:disabled):hover {
  border-color: var(--color-acento-claro);
  transform: translateY(-2px);
}

.opcion:focus-visible {
  outline: 3px solid var(--color-foco);
  outline-offset: 3px;
}

.opcion--activa {
  border-color: var(--color-acento);
  background: var(--color-acento-tenue);
}

.opcion--correcta {
  border-color: var(--color-exito);
  background: color-mix(in srgb, var(--color-exito) 18%, var(--color-superficie-alta));
  animation: latido 0.45s ease;
}

.opcion--incorrecta {
  border-color: var(--color-error);
  background: color-mix(in srgb, var(--color-error) 15%, var(--color-superficie-alta));
}

.opcion:disabled {
  cursor: default;
}

.opcion__marca {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.6rem;
  background: var(--color-superficie);
  font-weight: 800;
  font-size: 1rem;
}

.opcion__marca--redonda {
  border-radius: 50%;
}

.opcion--activa .opcion__marca {
  background: var(--color-acento);
  color: #fff;
}

.opcion--correcta .opcion__marca {
  background: var(--color-exito);
  color: #06281a;
}

.opcion--incorrecta .opcion__marca {
  background: var(--color-error);
  color: #fff;
}

.opcion__contenido {
  flex: 1;
  min-width: 0;
}

.opcion__texto {
  display: block;
  line-height: 1.45;
}

/* Opciones ilustradas: la imagen manda y la letra flota en una esquina. */
.opcion--imagen {
  flex-direction: column;
  align-items: stretch;
  padding: 0.75rem;
  gap: 0.5rem;
}

.opcion--imagen .opcion__marca {
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  z-index: 1;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
}

.opcion--imagen .opcion__contenido {
  display: grid;
  place-items: center;
  min-height: 8.5rem;
}

.opcion--imagen :deep(img) {
  max-height: 11rem;
  width: auto;
  object-fit: contain;
}

@keyframes latido {
  0%,
  100% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  .opcion,
  .opcion--correcta {
    animation: none;
    transition: none;
  }
  .opcion:not(:disabled):hover {
    transform: none;
  }
}
</style>
