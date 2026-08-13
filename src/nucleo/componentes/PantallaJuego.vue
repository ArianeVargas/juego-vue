<script setup>
import { useRouter } from 'vue-router'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'
import { usarSonido } from '@/nucleo/composables/usarSonido'

/**
 * Marco común de todas las pantallas: barra superior con el título del
 * módulo, botones de menú/ayuda/sonido y una zona de contenido centrada.
 */
defineProps({
  titulo: { type: String, default: '' },
  subtitulo: { type: String, default: '' },
  acento: { type: String, default: '' },
  conMenu: { type: Boolean, default: true },
})

const router = useRouter()
const { activo, alternar } = usarSonido()
</script>

<template>
  <div class="pantalla" :style="acento ? { '--color-acento': acento } : null">
    <header class="pantalla__barra">
      <div class="pantalla__identidad">
        <h1 class="pantalla__titulo">{{ titulo }}</h1>
        <p v-if="subtitulo" class="pantalla__subtitulo">{{ subtitulo }}</p>
      </div>

      <nav class="pantalla__acciones" aria-label="Acciones">
        <slot name="acciones" />
        <BotonJuego
          variante="fantasma"
          :icono="activo ? '🔊' : '🔇'"
          silencioso
          :aria-label="activo ? 'Desactivar sonido' : 'Activar sonido'"
          @click="alternar"
        >
          <span class="pantalla__solo-ancho">Sonido</span>
        </BotonJuego>
        <BotonJuego variante="fantasma" icono="❔" @click="router.push({ name: 'ayuda' })">
          <span class="pantalla__solo-ancho">Ayuda</span>
        </BotonJuego>
        <BotonJuego
          v-if="conMenu"
          variante="secundario"
          icono="🏠"
          @click="router.push({ name: 'menu' })"
        >
          <span class="pantalla__solo-ancho">Contenido</span>
        </BotonJuego>
      </nav>
    </header>

    <main class="pantalla__contenido">
      <slot />
    </main>

    <footer v-if="$slots.pie" class="pantalla__pie">
      <slot name="pie" />
    </footer>
  </div>
</template>

<style scoped>
.pantalla {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.pantalla__barra {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem clamp(1rem, 4vw, 2.5rem);
  padding-top: max(0.85rem, env(safe-area-inset-top));
  background: color-mix(in srgb, var(--color-fondo) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-borde);
}

.pantalla__titulo {
  margin: 0;
  font-size: clamp(1.1rem, 0.9rem + 1vw, 1.5rem);
  line-height: 1.2;
}

.pantalla__subtitulo {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  color: var(--color-texto-suave);
}

.pantalla__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pantalla__contenido {
  flex: 1;
  width: min(64rem, 100%);
  margin: 0 auto;
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.pantalla__pie {
  position: sticky;
  bottom: 0;
  padding: 0.85rem clamp(1rem, 4vw, 2.5rem);
  padding-bottom: max(0.85rem, env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--color-fondo) 92%, transparent);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-borde);
}

/* En pantallas estrechas los botones se quedan solo con el icono. */
@media (max-width: 40rem) {
  .pantalla__solo-ancho {
    display: none;
  }
}
</style>
