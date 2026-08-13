<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PantallaJuego from '@/nucleo/componentes/PantallaJuego.vue'
import TarjetaModulo from '@/nucleo/componentes/TarjetaModulo.vue'
import BotonJuego from '@/nucleo/componentes/BotonJuego.vue'
import { cuentos } from '@/modulos/cuentos/datos/cuentos'
import { ejercicios } from '@/modulos/ejercicios/datos/ejercicios'
import { preguntasEvaluacion } from '@/modulos/evaluacion/datos/evaluacion'
import { usarProgreso } from '@/nucleo/almacen/progreso'

const router = useRouter()
const { estado, cuentosCompletados, reiniciar } = usarProgreso()

const marcadorDe = (id) => {
  const registro = estado.cuentos[id]
  return registro ? `${registro.aciertos} / ${registro.total} aciertos` : ''
}

const marcadorEjercicios = computed(() =>
  estado.ejercicios.completado
    ? `${estado.ejercicios.aciertos} / ${ejercicios.length} aciertos`
    : '',
)

const marcadorEvaluacion = computed(() =>
  estado.evaluacion.nota !== null ? `Nota ${estado.evaluacion.nota.toFixed(1)}` : '',
)

function confirmarReinicio() {
  if (confirm('¿Seguro que quieres borrar todo tu progreso y empezar de nuevo?')) reiniciar()
}
</script>

<template>
  <PantallaJuego
    titulo="Contenido"
    subtitulo="Elige una actividad para comenzar"
    :con-menu="false"
  >
    <template #acciones>
      <BotonJuego variante="fantasma" icono="↺" @click="confirmarReinicio">
        <span>Reiniciar</span>
      </BotonJuego>
    </template>

    <p class="menu__intro">
      Has completado <strong>{{ cuentosCompletados }}</strong> de
      <strong>{{ cuentos.length }}</strong> cuentos. Lee cada texto con calma —al menos dos
      veces— y luego responde las preguntas.
    </p>

    <h2 class="menu__seccion">Cuentos</h2>
    <div class="menu__rejilla">
      <TarjetaModulo
        v-for="(cuento, i) in cuentos"
        :key="cuento.id"
        :numero="i + 1"
        :titulo="cuento.titulo"
        :descripcion="`${cuento.preguntas.length} preguntas de comprensión`"
        :imagen="cuento.portada"
        :acento="cuento.acento"
        :completado="Boolean(estado.cuentos[cuento.id]?.completado)"
        :marcador="marcadorDe(cuento.id)"
        @abrir="router.push({ name: 'cuento', params: { id: cuento.id } })"
      />
    </div>

    <h2 class="menu__seccion">Actividades finales</h2>
    <div class="menu__rejilla">
      <TarjetaModulo
        numero="6"
        titulo="Ejercicios"
        descripcion="Completa la frase con la opción correcta"
        icono="✏️"
        acento="#f79646"
        :completado="estado.ejercicios.completado"
        :marcador="marcadorEjercicios"
        @abrir="router.push({ name: 'ejercicios' })"
      />
      <TarjetaModulo
        numero="7"
        titulo="Evaluación"
        :descripcion="`${preguntasEvaluacion.length} preguntas sobre todos los cuentos`"
        icono="🏅"
        acento="#4bacc6"
        :completado="estado.evaluacion.nota !== null"
        :marcador="marcadorEvaluacion"
        @abrir="router.push({ name: 'evaluacion' })"
      />
    </div>
  </PantallaJuego>
</template>

<style scoped>
.menu__intro {
  margin: 0 0 2rem;
  max-width: 46rem;
  line-height: 1.6;
  color: var(--color-texto-suave);
}

.menu__seccion {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-texto-suave);
}

.menu__rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}
</style>
