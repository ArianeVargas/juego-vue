<script setup>
import { useRouter } from 'vue-router'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'

const router = useRouter()
</script>

<template>
  <div class="portada">
    <div class="portada__contenido">
      <p class="portada__institucion">Institución Educativa Integrado de Cómbita · Boyacá</p>
      <h1 class="portada__titulo">
        <span>Diviértete</span>
        <span class="portada__titulo-realce">con los Cuentos</span>
      </h1>
      <p class="portada__lema">La alegría de leer…</p>
      <p class="portada__presentado">Estudiante: Cristian Andrés Gutiérrez Vargas</p>

      <p class="portada__bienvenida">
        Bienvenidos a la aventura de leer y de comprender lo que lees. Para desarrollar de una
        manera práctica y eficaz este aplicativo, debes leer por lo menos dos veces los textos:
        eso te será útil para poder contestar los ejercicios de comprensión lectora.
      </p>

      <div class="portada__acciones">
        <BotonJuego tamano="grande" icono="▶" @click="router.push({ name: 'menu' })">
          Comenzar
        </BotonJuego>
        <BotonJuego variante="fantasma" icono="❔" @click="router.push({ name: 'ayuda' })">
          Ayuda
        </BotonJuego>
      </div>

      <p class="portada__desarrollador">Desarrollado por: Ariane Hernandez e Ivan Aparicio</p>
    </div>
  </div>
</template>

<style scoped>
.portada {
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: clamp(1.5rem, 5vw, 3rem);
  background:
    radial-gradient(circle at 15% 20%, rgb(79 129 189 / 0.35), transparent 55%),
    radial-gradient(circle at 85% 80%, rgb(155 187 89 / 0.3), transparent 55%),
    var(--color-fondo);
}

.portada__contenido {
  width: min(46rem, 100%);
  text-align: center;
}

.portada__institucion {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-texto-suave);
}

.portada__titulo {
  margin: 0;
  font-size: clamp(2.4rem, 1.5rem + 6vw, 4.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.portada__titulo span {
  display: block;
}

.portada__titulo-realce {
  background: linear-gradient(95deg, #ffd166, #f79646, #9bbb59);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.portada__lema {
  margin: 0.8rem 0 0;
  font-size: clamp(1.1rem, 1rem + 0.6vw, 1.4rem);
  color: var(--color-texto-suave);
  font-style: italic;
}

.portada__bienvenida {
  max-width: 38rem;
  margin: 1.8rem auto 0;
  line-height: 1.65;
  color: var(--color-texto-suave);
}

.portada__acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2.2rem;
}

.portada__presentado {
  margin: 1.4rem 0 0;
  font-size: 0.95rem;
  color: var(--color-texto-suave);
}

.portada__desarrollador {
  margin: 2.4rem 0 0;
  font-size: 0.8rem;
  color: var(--color-texto-suave);
  opacity: 0.75;
}
</style>
