<script setup>
import { computed } from 'vue'

/**
 * Equivale a las diapositivas «Felicidades…» y «Debes leer mejor… Sigue
 * intentando» del aplicativo original, pero sin sacar al niño de la pregunta.
 */
const props = defineProps({
  estado: { type: String, required: true }, // 'acierto' | 'fallo'
})

const acierto = computed(() => props.estado === 'acierto')
</script>

<template>
  <div class="aviso" :class="acierto ? 'aviso--acierto' : 'aviso--fallo'" role="status">
    <span class="aviso__icono" aria-hidden="true">{{ acierto ? '🎉' : '📖' }}</span>
    <div class="aviso__cuerpo">
      <p class="aviso__titulo">{{ acierto ? '¡Felicidades!' : 'Debes leer mejor…' }}</p>
      <p class="aviso__detalle">
        {{ acierto ? 'Respuesta correcta. ¡Sigue así!' : 'Sigue intentando, vuelve a leer el texto.' }}
      </p>
    </div>
    <div class="aviso__acciones">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aviso {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 1.1rem;
  border: 3px solid;
  animation: aparecer 0.28s ease;
}

.aviso--acierto {
  border-color: var(--color-exito);
  background: color-mix(in srgb, var(--color-exito) 16%, var(--color-superficie));
}

.aviso--fallo {
  border-color: var(--color-error);
  background: color-mix(in srgb, var(--color-error) 14%, var(--color-superficie));
}

.aviso__icono {
  font-size: 2.2rem;
  line-height: 1;
}

.aviso__cuerpo {
  flex: 1 1 12rem;
}

.aviso__titulo {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
}

.aviso__detalle {
  margin: 0.15rem 0 0;
  color: var(--color-texto-suave);
  font-size: 0.95rem;
}

.aviso__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aviso {
    animation: none;
  }
}
</style>
