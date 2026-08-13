<script setup>
import { recurso } from '@/nucleo/recursos'

defineProps({
  cuento: { type: Object, required: true },
})
</script>

<template>
  <article class="lectura">
    <figure class="lectura__figura">
      <img :src="recurso(cuento.portada)" alt="" loading="eager" decoding="async" />
    </figure>

    <div class="lectura__texto">
      <p v-for="(parrafo, i) in cuento.lectura" :key="i">{{ parrafo }}</p>
    </div>

    <p class="lectura__consejo">
      💡 Recuerda leer el texto <strong>al menos dos veces</strong> antes de responder.
    </p>
  </article>
</template>

<style scoped>
.lectura {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 1.3rem;
  padding: clamp(1.25rem, 4vw, 2.25rem);
}

.lectura__figura {
  margin: 0 0 1.5rem;
  text-align: center;
}

.lectura__figura img {
  max-height: 12rem;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgb(0 0 0 / 0.3));
}

/* Dos columnas en pantallas anchas, como las dos cajas de texto del original. */
.lectura__texto {
  font-size: clamp(1.02rem, 0.98rem + 0.25vw, 1.15rem);
  line-height: 1.75;
}

.lectura__texto p {
  margin: 0 0 1rem;
  break-inside: avoid;
}

@media (min-width: 52rem) {
  .lectura__texto {
    columns: 2;
    column-gap: 2.5rem;
  }
}

.lectura__consejo {
  margin: 1.25rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-borde);
  color: var(--color-texto-suave);
  font-size: 0.95rem;
}
</style>
