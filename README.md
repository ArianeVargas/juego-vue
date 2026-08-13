# Diviértete con los Cuentos

Aplicativo de comprensión lectora de la **Institución Educativa Integrado de Cómbita (Boyacá)**,
reconstruido como aplicación web progresiva (PWA) en Vue 3.

Sustituye a los dos archivos originales de PowerPoint (`Comprensión Lectora.ppsm` y
`Evaluación Final.ppsm`) y funciona en cualquier dispositivo con navegador, también sin conexión.

## Puesta en marcha

```bash
npm install
npm run dev      # desarrollo, en http://localhost:5173
npm run build    # genera la versión final en dist/
npm run preview  # sirve dist/ para comprobarla
```

Para publicarla basta con subir el contenido de `dist/` a cualquier servidor web
(o a GitHub Pages, Netlify, el servidor del colegio…). Usa rutas relativas y navegación
por *hash*, así que funciona incluso desde una subcarpeta.

## Estructura

```
src/
├─ nucleo/                     Todo lo compartido entre módulos
│  ├─ componentes/             Componentes reutilizables
│  │  ├─ PantallaJuego.vue       Marco común (barra superior, contenido, pie)
│  │  ├─ PanelPregunta.vue       Pregunta + opciones (lo usan los 3 módulos)
│  │  ├─ OpcionRespuesta.vue     Una opción, de texto o ilustrada
│  │  ├─ ImagenDuotono.vue       Recoloreado de imágenes con filtro SVG
│  │  ├─ AvisoRetroalimentacion.vue  «¡Felicidades!» / «Debes leer mejor…»
│  │  ├─ ResumenResultados.vue   Anillo de porcentaje, medalla y nota
│  │  ├─ BarraProgreso.vue
│  │  ├─ TarjetaModulo.vue       Tarjetas del menú
│  │  └─ BotonJuego.vue
│  ├─ composables/
│  │  ├─ usarCuestionario.js     Motor de cuestionarios (único para los 3 módulos)
│  │  └─ usarSonido.js           Sonidos originales del PowerPoint
│  ├─ almacen/progreso.js        Estado global persistido en el dispositivo
│  └─ recursos.js                Rutas de imágenes y audio
│
├─ modulos/
│  ├─ inicio/                  Portada, menú de contenido y ayuda
│  ├─ cuentos/                 Los 5 cuentos: lectura + preguntas
│  │  ├─ datos/cuentos.js
│  │  ├─ componentes/LecturaCuento.vue
│  │  └─ VistaCuento.vue
│  ├─ ejercicios/              Completar la frase
│  └─ evaluacion/              Evaluación final con nota
│
├─ router/                     Rutas (cada vista se carga bajo demanda)
└─ estilos/base.css            Variables de color y estilos base
```

Las dependencias son solo **Vue 3** y **Vue Router**; el resto (motor de cuestionarios,
estado, estilos) está escrito a mano, sin librerías de UI.

## Contenido

| Módulo | Contenido |
| --- | --- |
| El Conejo Serafín | Lectura + 7 preguntas |
| El Reino | Lectura + 6 preguntas |
| Los Pasteles | Lectura + 6 preguntas |
| Viaje a la Selva | Lectura + 5 preguntas |
| El Reloj | Lectura + 3 preguntas |
| Ejercicios | 6 frases para completar |
| Evaluación final | 13 preguntas, con nota sobre 5,0 |

Los textos, las preguntas, las ilustraciones y los sonidos se extrajeron de los archivos
originales de PowerPoint. Las respuestas correctas se dedujeron de los hipervínculos
(que saltaban a las diapositivas «Felicidades…» / «Debes leer mejor…») y de los
disparadores de animación de las preguntas ilustradas.

## Qué cambia respecto al original

- **Funciona en cualquier dispositivo.** La evaluación final dependía de macros VBA y de
  96 controles ActiveX, que solo existen en PowerPoint para Windows. Aquí es Vue.
- **Se instala y funciona sin conexión** (PWA): todas las imágenes y sonidos quedan
  precargados en el dispositivo.
- **Guarda el progreso** de cada estudiante en el propio dispositivo.
- **Corrige y califica sola**: la evaluación da la nota y permite revisar respuesta a respuesta.
- **Accesible**: navegable con teclado, con foco visible, textos alternativos y respeto por
  la preferencia de «reducir movimiento» del sistema.
- Se corrigieron erratas del original («Divíertete», «lospájaros», «hacia» por «hacía»…)
  y se eliminó una pregunta repetida en la evaluación.

## Utilidades

```bash
python3 herramientas/generar-iconos.py   # regenera los iconos de la PWA
```
