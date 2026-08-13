<script setup>
import { computed } from 'vue'
import { recurso } from '@/nucleo/recursos'

const props = defineProps({
  numero: { type: [Number, String], default: '' },
  titulo: { type: String, required: true },
  descripcion: { type: String, default: '' },
  imagen: { type: String, default: '' },
  icono: { type: String, default: '' },
  acento: { type: String, default: 'var(--color-acento)' },
  completado: { type: Boolean, default: false },
  marcador: { type: String, default: '' },
})

defineEmits(['abrir'])

const fondo = computed(() => (props.imagen ? recurso(props.imagen) : null))
</script>

<template>
  <button
    type="button"
    class="tarjeta"
    :style="{ '--acento-tarjeta': acento }"
    @click="$emit('abrir')"
  >
    <span class="tarjeta__medio">
      <img v-if="fondo" :src="fondo" :alt="''" loading="lazy" decoding="async" />
      <span v-else class="tarjeta__icono" aria-hidden="true">{{ icono }}</span>
      <span v-if="numero !== ''" class="tarjeta__numero">{{ numero }}</span>
      <span v-if="completado" class="tarjeta__sello" aria-label="Actividad completada">✓</span>
    </span>

    <span class="tarjeta__cuerpo">
      <span class="tarjeta__titulo">{{ titulo }}</span>
      <span v-if="descripcion" class="tarjeta__descripcion">{{ descripcion }}</span>
      <span v-if="marcador" class="tarjeta__marcador">{{ marcador }}</span>
    </span>
  </button>
</template>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  border: 3px solid var(--color-borde);
  border-radius: 1.3rem;
  background: var(--color-superficie);
  color: var(--color-texto);
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.16s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.tarjeta:hover {
  transform: translateY(-4px);
  border-color: var(--acento-tarjeta);
  box-shadow: 0 12px 28px rgb(0 0 0 / 0.3);
}

.tarjeta:focus-visible {
  outline: 3px solid var(--color-foco);
  outline-offset: 3px;
}

.tarjeta__medio {
  position: relative;
  display: grid;
  place-items: center;
  height: 8.5rem;
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--acento-tarjeta) 45%, var(--color-superficie-alta)),
    var(--color-superficie-alta)
  );
}

.tarjeta__medio img {
  max-height: 6.6rem;
  max-width: 78%;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgb(0 0 0 / 0.3));
}

.tarjeta__icono {
  font-size: 3.4rem;
  line-height: 1;
}

.tarjeta__numero {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  display: grid;
  place-items: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 999px;
  background: var(--acento-tarjeta);
  color: #fff;
  font-weight: 800;
  font-size: 0.95rem;
}

.tarjeta__sello {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--color-exito);
  color: #06281a;
  font-weight: 800;
}

.tarjeta__cuerpo {
  display: block;
  padding: 0.9rem 1.1rem 1.1rem;
}

.tarjeta__titulo {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.25;
}

.tarjeta__descripcion {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: var(--color-texto-suave);
}

.tarjeta__marcador {
  display: inline-block;
  margin-top: 0.6rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--color-superficie-alta);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-texto-suave);
}

@media (prefers-reduced-motion: reduce) {
  .tarjeta {
    transition: none;
  }
  .tarjeta:hover {
    transform: none;
  }
}
</style>
