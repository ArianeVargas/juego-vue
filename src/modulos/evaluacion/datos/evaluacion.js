/**
 * Evaluación final — 13 preguntas.
 *
 * Reconstruida desde «Evaluación Final.ppsm», que en el original dependía de
 * macros VBA y controles ActiveX (solo Windows). Aquí se ejecuta en cualquier
 * dispositivo y además calcula la nota automáticamente.
 *
 * Nota: el original repetía dos veces «¿Qué dibujo representa un arenque?»
 * (diapositivas 4 y 7). La segunda se sustituyó por una pregunta equivalente
 * sobre el mismo cuento para no duplicar contenido.
 */

export const preguntasEvaluacion = [
  {
    enunciado: '¿Qué odia comer Serafín?',
    tipo: 'texto',
    opciones: [
      { texto: 'Odia comer zanahorias' },
      { texto: 'Odia comer papas' },
      { texto: 'Odia comer huevos' },
      { texto: 'Odia comer sandías' },
    ],
    correctas: [0],
  },
  {
    enunciado: '¿Qué hacía Serafín con las pepitas?',
    tipo: 'texto',
    opciones: [
      { texto: 'Se las comía' },
      { texto: 'Las enterraba' },
      { texto: 'Las tiraba a la basura' },
      { texto: 'Se las daba de comer a los pájaros' },
    ],
    correctas: [1],
  },
  {
    enunciado: '¿Qué dibujo representa un arenque?',
    tipo: 'imagen',
    opciones: [
      { imagen: 'image22.png', alt: 'Animal' },
      { imagen: 'image20.png', alt: 'Pez' },
      { imagen: 'image21.png', alt: 'Animal' },
      { imagen: 'image14.png', alt: 'Conejo' },
    ],
    correctas: [1],
  },
  {
    enunciado: '¿Qué es una conserva?',
    tipo: 'texto',
    opciones: [
      { texto: 'Forma de limpiar la casa' },
      { texto: 'Mujer mayor que se opera para parecer más joven' },
      { texto: 'Producto que se obtiene del cielo tras la lluvia' },
      { texto: 'Alimento preparado para que se mantenga comestible durante mucho tiempo' },
    ],
    correctas: [3],
  },
  {
    enunciado: '¿Qué pasa cuando una persona tiene insomnio?',
    tipo: 'texto',
    opciones: [
      { texto: 'No para de cantar' },
      { texto: 'No puede dormirse' },
      { texto: 'No puede comer pescado' },
      { texto: 'Duerme durante horas' },
    ],
    correctas: [1],
  },
  {
    enunciado: 'En el texto «Viaje a la selva», ¿cómo irá vestido Pablo a cazar?',
    tipo: 'imagen',
    opciones: [
      { imagen: 'image42.png', alt: 'Vestimenta' },
      { imagen: 'image36.png', alt: 'Falda de paja y collar de huesos' },
      { imagen: 'image41.png', alt: 'Vestimenta' },
      { imagen: 'image43.png', alt: 'Vestimenta' },
    ],
    correctas: [1],
  },
  {
    enunciado:
      'En el texto «Los pasteles», ¿qué relación tenía la joven pastelera con la anciana?',
    tipo: 'texto',
    opciones: [
      { texto: 'Hija' },
      { texto: 'Sobrina' },
      { texto: 'Nieta' },
      { texto: 'Hermana' },
    ],
    correctas: [0],
  },
  {
    enunciado: 'En el texto «Los pasteles», ¿qué llevaba el hombre en el saco?',
    tipo: 'texto',
    opciones: [
      { texto: 'Granos' },
      { texto: 'Perlas' },
      { texto: 'Pepitas' },
      { texto: 'Semillas' },
    ],
    correctas: [3],
  },
  {
    enunciado: 'En el texto «Los pasteles», ¿cuándo llegó el hombre al puerto de Amberes?',
    tipo: 'texto',
    opciones: [
      { texto: 'Al atardecer' },
      { texto: 'Al amanecer' },
      { texto: 'En verano' },
      { texto: 'Al anochecer' },
    ],
    correctas: [3],
  },
  {
    enunciado: 'En el texto «Viaje a la selva», ¿qué animal cazará Pablo?',
    tipo: 'imagen',
    opciones: [
      { imagen: 'image37.png', alt: 'Animal' },
      { imagen: 'image38.png', alt: 'Animal' },
      { imagen: 'image40.png', alt: 'Cocodrilo' },
      { imagen: 'image39.png', alt: 'Animal' },
    ],
    correctas: [2],
  },
  {
    enunciado: 'En el texto «Viaje a la selva», ¿a qué se dedicaba Pablo?',
    tipo: 'texto',
    opciones: [
      { texto: 'Presentador de televisión' },
      { texto: 'Periodista de una revista' },
      { texto: 'Escribe en un periódico' },
      { texto: 'Periodista de radio' },
    ],
    correctas: [1],
  },
  {
    enunciado:
      'Del texto «El reloj», ¿qué opina el protagonista en la actualidad de que su primo se quede en casa?',
    tipo: 'texto',
    opciones: [
      { texto: 'Le encanta ya que disfrutan juntos' },
      { texto: 'Odia que vaya a su casa' },
      { texto: 'Considera que es un egoísta' },
      { texto: 'Le molesta' },
    ],
    correctas: [0],
  },
  {
    enunciado: 'Del texto «El reloj», ¿a cuál de las siguientes horas saldría el cuco?',
    tipo: 'imagen',
    opciones: [
      { imagen: 'image53.png', alt: 'Reloj' },
      { imagen: 'image54.png', alt: 'Reloj marcando una hora en punto' },
      { imagen: 'image52.png', alt: 'Reloj' },
      { imagen: 'image51.png', alt: 'Reloj' },
    ],
    correctas: [1],
  },
]
