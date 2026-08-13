<script setup>
import { computed, useId } from 'vue'
import { recurso } from '@/nucleo/recursos'

/**
 * Reproduce el efecto «duotono» que PowerPoint aplicaba a algunas imágenes
 * (por ejemplo, los cuatro conejos de la pregunta «¿Qué conejo es Serafín?»,
 * que en el original son la misma imagen recoloreada).
 *
 * Se resuelve con un filtro SVG en lugar de generar copias de la imagen,
 * así el aplicativo pesa menos y sigue siendo nítido a cualquier tamaño.
 */
const props = defineProps({
  imagen: { type: String, required: true },
  alt: { type: String, default: '' },
  duotono: { type: Object, default: null }, // { oscuro, claro }
})

const idFiltro = `duotono-${useId()}`
const src = computed(() => recurso(props.imagen))

function canal(hex, desplazamiento) {
  return parseInt(hex.slice(desplazamiento, desplazamiento + 2), 16) / 255
}

const tabla = computed(() => {
  if (!props.duotono) return null
  const { oscuro, claro } = props.duotono
  const limpio = (c) => c.replace('#', '')
  return {
    r: `${canal(limpio(oscuro), 0)} ${canal(limpio(claro), 0)}`,
    g: `${canal(limpio(oscuro), 2)} ${canal(limpio(claro), 2)}`,
    b: `${canal(limpio(oscuro), 4)} ${canal(limpio(claro), 4)}`,
  }
})
</script>

<template>
  <span class="duotono">
    <svg v-if="tabla" class="duotono__defs" aria-hidden="true" focusable="false">
      <filter :id="idFiltro" color-interpolation-filters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0    0    0    1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" :tableValues="tabla.r" />
          <feFuncG type="table" :tableValues="tabla.g" />
          <feFuncB type="table" :tableValues="tabla.b" />
        </feComponentTransfer>
      </filter>
    </svg>
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :style="tabla ? { filter: `url(#${idFiltro})` } : null"
    />
  </span>
</template>

<style scoped>
.duotono {
  display: contents;
}

.duotono__defs {
  position: absolute;
  width: 0;
  height: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
