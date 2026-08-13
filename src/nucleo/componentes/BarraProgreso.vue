<script setup>
import { computed } from 'vue'

const props = defineProps({
  actual: { type: Number, required: true },
  total: { type: Number, required: true },
  etiqueta: { type: String, default: 'Progreso' },
})

const porcentaje = computed(() =>
  props.total ? Math.min(100, Math.round((props.actual / props.total) * 100)) : 0,
)
</script>

<template>
  <div class="progreso">
    <div class="progreso__cabecera">
      <span>{{ etiqueta }}</span>
      <span class="progreso__cuenta">{{ actual }} / {{ total }}</span>
    </div>
    <div
      class="progreso__pista"
      role="progressbar"
      :aria-valuenow="actual"
      aria-valuemin="0"
      :aria-valuemax="total"
      :aria-label="etiqueta"
    >
      <div class="progreso__relleno" :style="{ width: `${porcentaje}%` }" />
    </div>
  </div>
</template>

<style scoped>
.progreso__cabecera {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.35rem;
  font-size: 0.85rem;
  color: var(--color-texto-suave);
}

.progreso__cuenta {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.progreso__pista {
  height: 0.6rem;
  border-radius: 999px;
  background: var(--color-superficie-alta);
  overflow: hidden;
}

.progreso__relleno {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-acento), var(--color-exito));
  transition: width 0.35s ease;
}

@media (prefers-reduced-motion: reduce) {
  .progreso__relleno {
    transition: none;
  }
}
</style>
