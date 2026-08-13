import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * Se usa historial con hash para que la aplicación funcione igual servida
 * desde un servidor, desde una carpeta local o instalada como PWA.
 * Las vistas de cada módulo se cargan bajo demanda.
 */
const rutas = [
  {
    path: '/',
    name: 'portada',
    component: () => import('@/modulos/inicio/VistaPortada.vue'),
    meta: { titulo: 'Diviértete con los Cuentos' },
  },
  {
    path: '/contenido',
    name: 'menu',
    component: () => import('@/modulos/inicio/VistaMenu.vue'),
    meta: { titulo: 'Contenido' },
  },
  {
    path: '/ayuda',
    name: 'ayuda',
    component: () => import('@/modulos/inicio/VistaAyuda.vue'),
    meta: { titulo: 'Ayuda' },
  },
  {
    path: '/cuento/:id',
    name: 'cuento',
    component: () => import('@/modulos/cuentos/VistaCuento.vue'),
    meta: { titulo: 'Cuento' },
  },
  {
    path: '/ejercicios',
    name: 'ejercicios',
    component: () => import('@/modulos/ejercicios/VistaEjercicios.vue'),
    meta: { titulo: 'Ejercicios' },
  },
  {
    path: '/evaluacion',
    name: 'evaluacion',
    component: () => import('@/modulos/evaluacion/VistaEvaluacion.vue'),
    meta: { titulo: 'Evaluación final' },
  },
  { path: '/:rutaNoEncontrada(.*)*', redirect: { name: 'portada' } },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: rutas,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((destino) => {
  document.title = destino.meta.titulo
    ? `${destino.meta.titulo} · Diviértete con los Cuentos`
    : 'Diviértete con los Cuentos'
})
