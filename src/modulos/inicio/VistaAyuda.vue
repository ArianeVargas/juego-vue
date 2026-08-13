<script setup>
import { useRouter } from 'vue-router'
import PantallaJuego from '@/nucleo/componentes/PantallaJuego.vue'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'

const router = useRouter()

const pasos = [
  {
    icono: '🏠',
    titulo: 'Contenido',
    texto: 'Vuelve al menú principal, donde están todos los cuentos y actividades.',
  },
  {
    icono: '📖',
    titulo: 'Leer el texto',
    texto: 'Cada cuento empieza por su lectura. Léela al menos dos veces antes de responder.',
  },
  {
    icono: '👆',
    titulo: 'Responder',
    texto:
      'Toca la opción que creas correcta y pulsa «Comprobar». Algunas preguntas piden marcar varias respuestas.',
  },
  {
    icono: '🔁',
    titulo: 'Intentar de nuevo',
    texto: 'Si fallas, puedes volver a intentarlo tantas veces como quieras.',
  },
  {
    icono: '🏅',
    titulo: 'Evaluación',
    texto:
      'Cuando termines el recorrido por todo el aplicativo, contesta la evaluación final: te dirá cuánto has comprendido y aprendido.',
  },
  {
    icono: '🔊',
    titulo: 'Sonido',
    texto: 'Puedes activar o silenciar los efectos de sonido desde la barra superior.',
  },
]
</script>

<template>
  <PantallaJuego titulo="Ayuda" subtitulo="Cómo funciona el aplicativo">
    <ul class="ayuda__lista">
      <li v-for="paso in pasos" :key="paso.titulo" class="ayuda__item">
        <span class="ayuda__icono" aria-hidden="true">{{ paso.icono }}</span>
        <div>
          <h2>{{ paso.titulo }}</h2>
          <p>{{ paso.texto }}</p>
        </div>
      </li>
    </ul>

    <div class="ayuda__nota">
      <h2>Funciona sin internet</h2>
      <p>
        Puedes instalar este aplicativo en el dispositivo desde el menú del navegador
        («Instalar aplicación» o «Añadir a la pantalla de inicio»). Una vez instalado funciona
        aunque no haya conexión, y tu progreso se guarda en el propio dispositivo.
      </p>
    </div>

    <div class="ayuda__acciones">
      <BotonJuego icono="←" @click="router.back()">Continuar</BotonJuego>
    </div>
  </PantallaJuego>
</template>

<style scoped>
.ayuda__lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
  margin: 0 0 2rem;
  padding: 0;
  list-style: none;
}

.ayuda__item {
  display: flex;
  gap: 0.9rem;
  padding: 1.1rem;
  border-radius: 1.1rem;
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
}

.ayuda__icono {
  font-size: 1.9rem;
  line-height: 1;
}

.ayuda__item h2 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
}

.ayuda__item p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-texto-suave);
}

.ayuda__nota {
  padding: 1.25rem;
  border-radius: 1.1rem;
  border: 2px dashed var(--color-borde);
}

.ayuda__nota h2 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}

.ayuda__nota p {
  margin: 0;
  line-height: 1.6;
  color: var(--color-texto-suave);
}

.ayuda__acciones {
  margin-top: 2rem;
}
</style>
