<script setup>
/**
 * Muestra la frase con el hueco. Cuando la respuesta es correcta, el hueco
 * se rellena con la opción elegida —igual que en el PowerPoint original,
 * donde el texto correcto aparecía sobre la línea punteada.
 */
defineProps({
  frase: { type: String, required: true },
  relleno: { type: String, default: '' },
  acertada: { type: Boolean, default: false },
})
</script>

<template>
  <p class="frase">
    <span>{{ frase }}</span>
    <span class="frase__hueco" :class="{ 'frase__hueco--lleno': acertada }">
      <transition name="revelar" mode="out-in">
        <span v-if="acertada" key="lleno">{{ relleno }}</span>
        <span v-else key="vacio" class="frase__vacio" aria-label="espacio en blanco" />
      </transition>
    </span>
  </p>
</template>

<style scoped>
.frase {
  margin: 0 0 1.75rem;
  padding: clamp(1.1rem, 3vw, 1.75rem);
  border-radius: 1.2rem;
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  font-size: clamp(1.2rem, 1rem + 1.1vw, 1.75rem);
  line-height: 1.5;
  font-weight: 700;
}

.frase__hueco {
  display: inline-block;
  margin-left: 0.4rem;
  padding: 0 0.35rem;
  border-bottom: 3px dashed var(--color-borde);
  color: var(--color-texto-suave);
}

.frase__hueco--lleno {
  border-bottom-color: var(--color-exito);
  color: var(--color-exito);
}

.frase__vacio {
  display: inline-block;
  width: 9ch;
}

.revelar-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.revelar-enter-from {
  opacity: 0;
  transform: translateY(-0.4rem);
}

@media (prefers-reduced-motion: reduce) {
  .revelar-enter-active {
    transition: none;
  }
}
</style>
