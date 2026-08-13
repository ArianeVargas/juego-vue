/**
 * Contenido de los cinco cuentos, extraído del aplicativo original en PowerPoint
 * («Comprensión Lectora.ppsm», Institución Educativa Integrado de Cómbita).
 *
 * Cada pregunta declara:
 *   tipo      'texto' | 'imagen'
 *   opciones  lista de opciones en el mismo orden que en el original
 *   correctas índices correctos (más de uno = selección múltiple)
 */

const GRIS = { oscuro: '#6b6a65', claro: '#ffffff' }
const MORADO = { oscuro: '#1c1233', claro: '#c9a0dc' }
const AMARILLO = { oscuro: '#3d3300', claro: '#ffe94d' }

export const cuentos = [
  {
    id: 'serafin',
    titulo: 'El Conejo Serafín',
    portada: 'image14.png',
    acento: '#d81b60',
    lectura: [
      'El conejo Serafín era rosa por comer tantas sandías. Odiaba las zanahorias pero le encantaba la fruta. Cuando comía una sandía grande enterraba las pepitas, con la intención de que con el tiempo naciera otra aún más grande.',
      'Como las sandías tienen muchas pepitas, Serafín hacía muchos agujeros.',
      'Un día el granjero decidió que Serafín no podía quedarse más tiempo en la granja, ya que al escarbar en el suelo estropeaba los cultivos. Un joven mago que pasaba por la granja compró a Serafín y le dijo:',
      '—A cambio de que salgas de mi chistera yo haré aparecer todas las sandías que quieras.',
      'Desde ese día el granjero, el mago y Serafín fueron felices.',
    ],
    preguntas: [
      {
        enunciado: '¿Qué tiene que hacer Serafín para que el mago le dé de comer sandías?',
        tipo: 'texto',
        opciones: [
          { texto: 'Comer sandías' },
          { texto: 'Salir de la chistera del mago' },
          { texto: 'Saltar por un aro' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿Cuáles eran los protagonistas del cuento?',
        pista: 'Selecciona los tres personajes.',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image14.png', alt: 'Conejo' },
          { imagen: 'image16.png', alt: 'Granjero' },
          { imagen: 'image13.png', alt: 'Personaje del cuento' },
          { imagen: 'image15.png', alt: 'Mago' },
          { imagen: 'image12.png', alt: 'Personaje del cuento' },
        ],
        correctas: [0, 1, 3],
      },
      {
        enunciado: '¿Qué odia comer Serafín?',
        tipo: 'texto',
        opciones: [
          { texto: 'Odia comer sandías' },
          { texto: 'Odia comer papas' },
          { texto: 'Odia comer huevos' },
          { texto: 'Odia comer zanahorias' },
        ],
        correctas: [3],
      },
      {
        enunciado: '¿Qué conejo es Serafín?',
        pista: 'Recuerda de qué color era por comer tantas sandías.',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image14.png', duotono: MORADO, alt: 'Conejo morado' },
          { imagen: 'image14.png', duotono: GRIS, alt: 'Conejo gris' },
          { imagen: 'image14.png', alt: 'Conejo rosa' },
          { imagen: 'image14.png', duotono: AMARILLO, alt: 'Conejo amarillo' },
        ],
        correctas: [2],
      },
      {
        enunciado: '¿Qué hacía Serafín con las pepitas?',
        tipo: 'texto',
        opciones: [
          { texto: 'Se las comía' },
          { texto: 'Las tiraba a la basura' },
          { texto: 'Las enterraba' },
          { texto: 'Se las daba de comer a los pájaros' },
        ],
        correctas: [2],
      },
      {
        enunciado: '¿En qué paisaje se desarrolla la acción?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image18.png', alt: 'Paisaje' },
          { imagen: 'image19.png', alt: 'Paisaje' },
          { imagen: 'image2.png', alt: 'Paisaje' },
          { imagen: 'image17.png', alt: 'Granja' },
        ],
        correctas: [3],
      },
      {
        enunciado: '¿Cuál es el estado de ánimo de los protagonistas al final del cuento?',
        tipo: 'texto',
        opciones: [
          { texto: 'Molestos' },
          { texto: 'Tristes' },
          { texto: 'Alegres' },
          { texto: 'Furiosos' },
        ],
        correctas: [2],
      },
    ],
  },

  {
    id: 'reino',
    titulo: 'El Reino',
    portada: 'image20.png',
    acento: '#00838f',
    lectura: [
      'En un reino rodeado de montañas era imposible conseguir pescado. Tras morir la reina, una crisis asoló el país e impidió a la princesa ir a buscar su preciado alimento. Tras muchas noches de insomnio, decidió:',
      '—Yo, la futura Reina, he de casarme. Lo haré con aquel hombre capaz de servir en el banquete de bodas arenques de primero.',
      'Tres hombres aceptaron el reto.',
      'El primero, un viejo rey, subió a lo más alto de las montañas, cargó hielo y se dirigió a la costa. Pero el hielo se derritió de regreso al reino y el pescado se pudrió.',
      'El segundo, un joven príncipe, mandó construir un gran barreño. Pero el muro se rompió al pasar entre las montañas, desparramando el pescado y el agua.',
      'En cambio el tercero, un aldeano, aprendió a extraer la sal del mar y conservar en ella los arenques. Al regresar al reino trajo consigo el pescado y se casó con la princesa.',
    ],
    preguntas: [
      {
        enunciado: '¿Qué productos se conservan en sal?',
        pista: 'Selecciona tres de ellos.',
        tipo: 'texto',
        opciones: [
          { texto: 'Bombones' },
          { texto: 'Anchoas' },
          { texto: 'Donuts' },
          { texto: 'Arenques' },
          { texto: 'Bacalao' },
        ],
        correctas: [1, 3, 4],
      },
      {
        enunciado: '¿Qué es una conserva?',
        tipo: 'texto',
        opciones: [
          { texto: 'Alimento preparado para que se mantenga comestible durante mucho tiempo.' },
          { texto: 'Mujer mayor que se opera para parecer más joven.' },
          { texto: 'Producto que se obtiene del cielo tras la lluvia.' },
          { texto: 'Forma de limpiar la casa.' },
        ],
        correctas: [0],
      },
      {
        enunciado: 'Selecciona las palabras que pertenezcan a la misma familia.',
        pista: 'Piensa en la palabra «sal».',
        tipo: 'texto',
        opciones: [
          { texto: 'Salero' },
          { texto: 'Salina' },
          { texto: 'Saltamontes' },
          { texto: 'Sal' },
          { texto: 'Salamandra' },
        ],
        correctas: [0, 1, 3],
      },
      {
        enunciado: '¿Qué dibujo representa a un arenque?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image22.png', alt: 'Animal' },
          { imagen: 'image20.png', alt: 'Pez' },
          { imagen: 'image14.png', duotono: MORADO, alt: 'Conejo' },
          { imagen: 'image21.png', alt: 'Animal' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿Qué pasa cuando una persona tiene insomnio?',
        tipo: 'texto',
        opciones: [
          { texto: 'No para de cantar.' },
          { texto: 'No puede dormirse.' },
          { texto: 'No puede comer pescado.' },
          { texto: 'Duerme durante horas.' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿Qué entiendes por crisis?',
        tipo: 'texto',
        opciones: [
          { texto: 'Momento en el que las princesas se convierten en reinas.' },
          { texto: 'Cambio brusco, normalmente negativo, en la vida de las personas.' },
          { texto: 'Una manera de comer arenques.' },
          { texto: 'Instrumento para tomar medidas.' },
        ],
        correctas: [1],
      },
    ],
  },

  {
    id: 'pasteles',
    titulo: 'Los Pasteles',
    portada: 'image23.png',
    acento: '#6d4c41',
    lectura: [
      'Una noche de enero, un barco de vela entró en el Puerto de Amberes, una ciudad de Bélgica. De aquel barco desembarcó un extraño hombre que tiritaba de frío y arrastraba un gran saco.',
      'Tras llamar a muchas puertas, solo una anciana le dio cobijo, además de ropa, comida y cama en una habitación con una estufa. A la mañana siguiente el hombre decidió regalarle el contenido de su bolsa.',
      'La anciana, extrañada por su contenido, preguntó al hombre:',
      '—Señor, ¿qué son estas semillas marrones?',
      'El hombre dijo:',
      '—Estas semillas, señora, son de cacao y con un poco de paciencia le enseñaré a hacer con ellas chocolate, un dulce delicioso.',
      'Pero la anciana, cansada de trabajar toda su vida, llevó al hombre a la pastelería de su hija. La joven pastelera aprendió a fabricar bombones de chocolate y el hombre aprendió a elaborar pasteles.',
      'Con el paso del tiempo los pasteles y bombones se hicieron famosos en todo Amberes, llegando a convertirse en la mejor pastelería de Bélgica.',
    ],
    preguntas: [
      {
        enunciado: '¿Qué productos se hicieron en la pastelería?',
        pista: 'Selecciona los tres productos.',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image25.png', alt: 'Producto de pastelería' },
          { imagen: 'image24.png', alt: 'Producto de pastelería' },
          { imagen: 'image27.png', alt: 'Producto' },
          { imagen: 'image26.png', alt: 'Producto de pastelería' },
        ],
        correctas: [0, 1, 3],
      },
      {
        enunciado: '¿Qué relación tenía la joven pastelera con la anciana?',
        tipo: 'texto',
        opciones: [
          { texto: 'Sobrina.' },
          { texto: 'Hija.' },
          { texto: 'Nieta.' },
          { texto: 'Hermana.' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿Quién abrió la puerta al hombre?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image29.png', alt: 'Persona' },
          { imagen: 'image23.png', alt: 'Anciana en mecedora' },
          { imagen: 'image28.png', alt: 'Persona' },
          { imagen: 'image30.png', alt: 'Persona' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿Cuándo llegó el hombre al puerto de Amberes?',
        tipo: 'texto',
        opciones: [
          { texto: 'Al amanecer.' },
          { texto: 'Al anochecer.' },
          { texto: 'Al atardecer.' },
          { texto: 'En verano.' },
        ],
        correctas: [1],
      },
      {
        enunciado: '¿En qué barco llegó el hombre al puerto?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image33.png', alt: 'Barco' },
          { imagen: 'image31.png', alt: 'Barco' },
          { imagen: 'image34.png', alt: 'Barco de vela' },
          { imagen: 'image32.png', alt: 'Barco' },
        ],
        correctas: [2],
      },
      {
        enunciado: '¿Qué había en el saco del hombre?',
        tipo: 'texto',
        opciones: [
          { texto: 'Semillas.' },
          { texto: 'Pepitas.' },
          { texto: 'Perlas.' },
          { texto: 'Granos.' },
        ],
        correctas: [0],
      },
    ],
  },

  {
    id: 'selva',
    titulo: 'Viaje a la Selva',
    portada: 'image35.png',
    acento: '#2e7d32',
    lectura: [
      'Mi nombre es Pablo y soy un aventurero. Trabajo como periodista para una revista de viajes. Ayer mi jefe me mandó en avión a África, para que escribiera sobre la experiencia de vivir en la selva durante una semana.',
      'Aquí en la selva hace mucho calor y llueve mucho, pero por lo menos no hace viento. Hoy me he encontrado con las personas que viven en la selva. Para poder dormir con ellos me han obligado a afeitarme el bigote y a cambiar el color rojo de mi pelo.',
      'Mañana me llevarán a cazar cocodrilos, en una barca de remo, pero antes me vestirán con una falda de paja y un collar de huesos. Espero que también me dejen una lanza larga como la de ellos.',
      'Ahora me marcho a dormir a mi cabaña de madera.',
      'Prometo escribir pronto. Pablo…',
    ],
    preguntas: [
      {
        enunciado: '¿Qué animal cazará Pablo?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image37.png', alt: 'Animal' },
          { imagen: 'image38.png', alt: 'Animal' },
          { imagen: 'image39.png', alt: 'Animal' },
          { imagen: 'image40.png', alt: 'Cocodrilo' },
        ],
        correctas: [3],
      },
      {
        enunciado: '¿A qué se dedica Pablo?',
        tipo: 'texto',
        opciones: [
          { texto: 'Periodista de una revista.' },
          { texto: 'Presentador de televisión.' },
          { texto: 'Escribe en un periódico.' },
          { texto: 'Periodista de radio.' },
        ],
        correctas: [0],
      },
      {
        enunciado: '¿Cómo irá vestido Pablo a cazar animales?',
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
        enunciado: '¿Qué arma utilizará Pablo para ir a cazar animales?',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image44.png', alt: 'Lanza larga' },
          { imagen: 'image46.png', alt: 'Arma' },
          { imagen: 'image47.png', alt: 'Arma' },
          { imagen: 'image45.png', alt: 'Arma' },
        ],
        correctas: [0],
      },
      {
        enunciado: 'Selecciona el lugar donde se encuentra Pablo.',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image48.png', alt: 'Paisaje' },
          { imagen: 'image49.png', alt: 'Paisaje' },
          { imagen: 'image35.png', alt: 'Selva' },
          { imagen: 'image50.png', alt: 'Paisaje' },
        ],
        correctas: [2],
      },
    ],
  },

  {
    id: 'reloj',
    titulo: 'El Reloj',
    portada: 'image51.png',
    acento: '#455a64',
    lectura: [
      'De aquel reloj, con forma de caseta para pájaros, cada dos por tres salía un pequeño cuco, un ruidoso animal que me recordaba a una paloma. Por supuesto, el animal era de mentira y el ruido que emitía era una grabación que se repetía cada vez que el reloj marcaba las horas en punto.',
      'Para ser sincero, no me gustaba. Me recordaba lo usurpadores que son los cucos reales, al poner sus huevos en nidos que no son suyos.',
      'Así otros pájaros cuidan y alimentan a su polluelo sin que ellos den un palo al agua.',
      'Algo parecido sucedía con mi tía, que dejaba a su hijo con frecuencia en mi casa.',
      'Cuando era pequeño me molestaba compartir mis juguetes, mi habitación e incluso la comida con mi primo, pero ahora he aprendido que, además, comparto juegos, amistad, risas y conversaciones con él. Y me encanta que venga a casa.',
    ],
    preguntas: [
      {
        enunciado:
          '¿Qué opina el protagonista en la actualidad de que su primo se quede en casa?',
        tipo: 'texto',
        opciones: [
          { texto: 'Le encanta, ya que disfrutan juntos.' },
          { texto: 'Odia que vaya a su casa.' },
          { texto: 'Considera que es un egoísta.' },
          { texto: 'Le molesta.' },
        ],
        correctas: [0],
      },
      {
        enunciado: '¿A cuál de las siguientes horas saldría el cuco?',
        pista: 'El cuco sale cuando el reloj marca las horas en punto.',
        tipo: 'imagen',
        opciones: [
          { imagen: 'image54.png', alt: 'Reloj marcando una hora en punto' },
          { imagen: 'image53.png', alt: 'Reloj' },
          { imagen: 'image52.png', alt: 'Reloj' },
          { imagen: 'image51.png', alt: 'Reloj' },
        ],
        correctas: [0],
      },
      {
        enunciado: '¿Qué significa la expresión «no dar un palo al agua»?',
        pista: 'Piénsalo dentro del contexto del cuento.',
        tipo: 'texto',
        opciones: [
          { texto: 'Ser vago, no trabajar ni querer trabajar.' },
          { texto: 'No querer remar.' },
          { texto: 'No tirar palos al agua.' },
          { texto: 'No colaborar en el cuidado de los hijos.' },
        ],
        correctas: [3],
      },
    ],
  },
]

export function obtenerCuento(id) {
  return cuentos.find((cuento) => cuento.id === id) ?? null
}
