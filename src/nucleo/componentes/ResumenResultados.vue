<script setup>
import { computed } from 'vue'

const props = defineProps({
  aciertos: { type: Number, required: true },
  total: { type: Number, required: true },
  titulo: { type: String, default: '¡Actividad terminada!' },
  conNota: { type: Boolean, default: false },
})

const porcentaje = computed(() =>
  props.total ? Math.round((props.aciertos / props.total) * 100) : 0,
)
const nota = computed(() => ((props.aciertos / props.total) * 5).toFixed(1))
const medalla = computed(() => {
  if (porcentaje.value >= 90) return { icono: '🏆', texto: '¡Excelente lectura!' }
  if (porcentaje.value >= 70) return { icono: '🥈', texto: '¡Muy bien! Vas por buen camino.' }
  if (porcentaje.value >= 50) return { icono: '🥉', texto: 'Bien, pero puedes mejorar.' }
  return { icono: '📚', texto: 'Vuelve a leer el texto y lo lograrás.' }
})

/** Circunferencia del anillo de progreso (r = 52). */
const PERIMETRO = 2 * Math.PI * 52
const trazo = computed(() => (porcentaje.value / 100) * PERIMETRO)
</script>

<template>
  <section class="resumen">
    <div class="resumen__anillo">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle class="resumen__pista" cx="60" cy="60" r="52" />
        <circle
          class="resumen__valor"
          cx="60"
          cy="60"
          r="52"
          :stroke-dasharray="`${trazo} ${PERIMETRO}`"
        />
      </svg>
      <div class="resumen__centro">
        <strong>{{ porcentaje }}%</strong>
        <span v-if="conNota">Nota {{ nota }}</span>
      </div>
    </div>

    <div class="resumen__texto">
      <p class="resumen__medalla" aria-hidden="true">{{ medalla.icono }}</p>
      <h2>{{ titulo }}</h2>
      <p class="resumen__detalle">
        Acertaste <strong>{{ aciertos }}</strong> de <strong>{{ total }}</strong> preguntas.
      </p>
      <p class="resumen__mensaje">{{ medalla.texto }}</p>
      <div class="resumen__acciones"><slot /></div>
    </div>
  </section>
</template>

<style scoped>
.resumen {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 5vw, 3rem);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 1.5rem;
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
}

.resumen__anillo {
  position: relative;
  flex: 0 0 auto;
  width: clamp(9rem, 30vw, 12rem);
}

.resumen__anillo svg {
  width: 100%;
  transform: rotate(-90deg);
}

.resumen__pista {
  fill: none;
  stroke: var(--color-superficie-alta);
  stroke-width: 12;
}

.resumen__valor {
  fill: none;
  stroke: var(--color-exito);
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dasharray 0.8s ease;
}

.resumen__centro {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-align: center;
  line-height: 1.2;
}

.resumen__centro strong {
  display: block;
  font-size: clamp(1.8rem, 6vw, 2.4rem);
}

.resumen__centro span {
  font-size: 0.9rem;
  color: var(--color-texto-suave);
}

.resumen__texto {
  flex: 1 1 16rem;
  text-align: center;
}

.resumen__medalla {
  margin: 0;
  font-size: 3rem;
  line-height: 1;
}

.resumen__texto h2 {
  margin: 0.4rem 0 0.5rem;
  font-size: clamp(1.3rem, 1rem + 1.5vw, 1.9rem);
}

.resumen__detalle,
.resumen__mensaje {
  margin: 0.25rem 0;
  color: var(--color-texto-suave);
}

.resumen__acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 1.4rem;
}

@media (min-width: 45rem) {
  .resumen__texto {
    text-align: left;
  }
  .resumen__acciones {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .resumen__valor {
    transition: none;
  }
}
</style>
