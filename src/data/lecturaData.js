// Complete bank of 15 Short Reading Comprehension Missions for 2nd Grade Primary (Misiones de Lectura Corta)
// Each mission includes 3 pertinent comprehension questions (literal, inferential, and values/emotions)
// plus a reflection prompt to chat in family.

export const LECTURA_MISSIONS = [
  {
    id: 1,
    title: 'El tesoro escondido de Toby',
    petId: 'dog',
    tag: 'Aventura en el parque',
    story: 'Toby el perrito enterró su hueso favorito debajo del gran roble del parque. Cuando regresó por la tarde, unas hojas amarillas de otoño tapaban por completo su escondite. Olfateando con cuidado y rascando con sus patitas, ¡encontró su tesoro y dio saltos de alegría!',
    reflection: '💭 Para pensar juntos: Si tú tuvieras un tesoro muy especial, ¿dónde lo guardarías para que nadie lo pierda?',
    questions: [
      {
        question: '¿Dónde había escondido Toby su hueso favorito?',
        options: [
          'Debajo del gran roble del parque',
          'Dentro de su casita de madera',
          'En el fondo del arroyo de piedras'
        ],
        correct: 0,
        explanation: '¡Muy bien leído! El texto dice claramente que lo enterró debajo del gran roble del parque.'
      },
      {
        question: '¿Qué estación del año era según las hojas que tapaban el suelo?',
        options: [
          'Otoño',
          'Verano',
          'Invierno'
        ],
        correct: 0,
        explanation: '¡Exacto! Las hojas amarillas que caen de los árboles indican que es la estación de otoño.'
      },
      {
        question: '¿Cómo demostró Toby que estaba muy feliz al encontrar su hueso?',
        options: [
          'Dio saltos de alegría',
          'Se puso a dormir una siesta',
          'Salió corriendo enfadado'
        ],
        correct: 0,
        explanation: '¡Eso es! El cuento dice que dio saltos de alegría al recuperar su tesoro.'
      }
    ]
  },
  {
    id: 2,
    title: 'La mariposa de Misi',
    petId: 'cat',
    tag: 'Curiosidad gatuna',
    story: 'A la gatita Misi le encanta tumbarse en los rayos cálidos del sol que entran por la ventana. De repente, vio una mariposa azul brillante sobre una maceta con flores. Misi dio un saltito silencioso, pero la mariposa voló alto hacia las nubes. Misi se acurrucó en su cojín morado a ronronear feliz.',
    reflection: '💭 Para pensar juntos: ¿Te gusta descansar al sol como a Misi? ¿Qué animales te gusta observar en la naturaleza?',
    questions: [
      {
        question: '¿De qué color era la mariposa que vio Misi?',
        options: [
          'Azul brillante',
          'Amarilla con rayas negras',
          'Roja como una fresa'
        ],
        correct: 0,
        explanation: '¡Genial! Misi vio una mariposa azul brillante sobre la maceta.'
      },
      {
        question: '¿Dónde estaba posada la mariposa al principio?',
        options: [
          'Sobre una maceta con flores',
          'En el cristal de la ventana',
          'En el plato de leche'
        ],
        correct: 0,
        explanation: '¡Correcto! Estaba descansando sobre una maceta con flores.'
      },
      {
        question: '¿Qué hizo Misi cuando la mariposa voló hacia el cielo?',
        options: [
          'Se acurrucó en su cojín morado a ronronear',
          'Se puso a maullar enfadada',
          'Rompió la maceta de flores'
        ],
        correct: 0,
        explanation: '¡Muy bien! Se quedó tranquila y se acurrucó en su cojín a ronronear.'
      }
    ]
  },
  {
    id: 3,
    title: 'La merienda compartida de Pompón',
    petId: 'rabbit',
    tag: 'Amistad y generosidad',
    story: 'El conejito Pompón salió temprano con una cesta que tenía tres zanahorias dulces. En el sendero del bosque vio a su amiga la ardilla buscando comida sin suerte. Pompón le regaló una zanahoria crujiente con una gran sonrisa. La ardilla le dio las gracias y Pompón se comió sus dos zanahorias bajo la sombra de un árbol.',
    reflection: '💭 Para pensar juntos: ¿Cómo te sientes tú cuando compartes algo tuyo con una amiga o un amigo?',
    questions: [
      {
        question: '¿Con quién compartió Pompón una de sus zanahorias dulces?',
        options: [
          'Con su amiga la ardilla',
          'Con un patito del estanque',
          'Con un erizo dormilón'
        ],
        correct: 0,
        explanation: '¡Correcto! Vio a la ardilla buscando comida y decidió compartir con ella.'
      },
      {
        question: 'Si Pompón tenía 3 zanahorias y regaló 1, ¿cuántas le quedaron?',
        options: [
          '2 zanahorias dulces',
          '1 sola zanahoria',
          '4 zanahorias grandes'
        ],
        correct: 0,
        explanation: '¡Matemáticas y lectura perfecta! 3 - 1 = 2 zanahorias.'
      },
      {
        question: '¿Qué valor importante demuestra Pompón en esta historia?',
        options: [
          'La generosidad y el compañerismo',
          'El egoísmo de no dar nada',
          'La pereza para buscar comida'
        ],
        correct: 0,
        explanation: '¡Exacto! Pompón es generoso porque ayuda a los demás con una sonrisa.'
      }
    ]
  },
  {
    id: 4,
    title: 'La música mágica del bosque de Bao',
    petId: 'panda',
    tag: 'Naturaleza tranquila',
    story: 'Bao el pandita estaba descansando entre los altos tallos de bambú verde. El viento soplaba suave y hacía chocar las cañas huecas, creando un sonido parecido a una flauta mágica. Bao cerró sus ojitos sonriendo y se durmió plácidamente escuchando la melodía de la naturaleza.',
    reflection: '💭 Para pensar juntos: ¿Qué sonidos de la naturaleza te ayudan a ti a relajarte o dormirte?',
    questions: [
      {
        question: '¿Qué hacía que las cañas de bambú sonaran como una flauta mágica?',
        options: [
          'El viento suave que soplaba',
          'Un pájaro carpintero con el pico',
          'Las pisadas de un oso gigante'
        ],
        correct: 0,
        explanation: '¡Bien leído! El viento suave soplaba y hacía chocar las cañas huecas.'
      },
      {
        question: '¿Entre qué plantas estaba descansando Bao el pandita?',
        options: [
          'Entre altos tallos de bambú verde',
          'En un campo de trigo dorado',
          'Bajo un arbusto de espinas'
        ],
        correct: 0,
        explanation: '¡Correcto! Los pandas adoran el bambú y allí estaba descansando.'
      },
      {
        question: '¿Cómo reaccionó Bao ante la música de la naturaleza?',
        options: [
          'Cerró los ojos sonriendo y se durmió plácidamente',
          'Salió corriendo asustado',
          'Se puso a talar las cañas'
        ],
        correct: 0,
        explanation: '¡Eso es! La música le relajó tanto que se durmió con una sonrisa.'
      }
    ]
  },
  {
    id: 5,
    title: 'El misterio del arroyo de Chispa',
    petId: 'fox',
    tag: 'Descubrimiento',
    story: 'Chispa la zorrita bajó al arroyo de agua cristalina a beber agua fresca. Al asomarse, vio en el agua la cara de un animal naranja con orejas puntiagudas. Al principio se asustó, pero cuando arrugó la nariz vio que el animal del agua hacía exactamente lo mismo: ¡era su propio reflejo en el agua limpia como un espejo!',
    reflection: '💭 Para pensar juntos: ¿Alguna vez has visto tu reflejo en un charco o en una cuchara limpia? ¿Cómo se ve?',
    questions: [
      {
        question: '¿A qué lugar bajó Chispa la zorrita?',
        options: [
          'Al arroyo de agua cristalina',
          'A una cueva oscura',
          'A la cima de la montaña nevada'
        ],
        correct: 0,
        explanation: '¡Muy bien! Bajó al arroyo de agua limpia para beber agua fresca.'
      },
      {
        question: '¿Qué vio realmente Chispa en el agua transparente?',
        options: [
          'Su propio reflejo como en un espejo',
          'Un pez de colores brillantes',
          'Un duende del bosque'
        ],
        correct: 0,
        explanation: '¡Eso es! El agua limpia actuó como un espejo y vio su propia cara.'
      },
      {
        question: '¿Cómo comprobó Chispa que el animal del agua era ella misma?',
        options: [
          'Arrugó la nariz y el reflejo hizo lo mismo',
          'Le habló y el agua le contestó',
          'Tiró una piedra al agua'
        ],
        correct: 0,
        explanation: '¡Excelente atención al detalle! Al arrugar la nariz vio que el reflejo la imitaba.'
      }
    ]
  },
  {
    id: 6,
    title: 'El saludo desde las alturas de Kiko',
    petId: 'koala',
    tag: 'Vida en los árboles',
    story: 'Kiko el koala trepó despacito hasta la copa del eucalipto más alto. Desde allí arriba se veía todo el parque de mascotas: Toby corría feliz y Misi saltaba jugando. Kiko levantó su patita peluda para saludarles desde las ramas y disfrutó de su rico desayuno de hojas frescas con una vista maravillosa.',
    reflection: '💭 Para pensar juntos: Si pudieras subir a un sitio muy alto, ¿qué te gustaría ver desde arriba?',
    questions: [
      {
        question: '¿A qué árbol trepó despacito Kiko el koala?',
        options: [
          'A un eucalipto alto',
          'A un pino con piñas',
          'A un manzano con manzanas rojas'
        ],
        correct: 0,
        explanation: '¡Muy bien! Los koalas viven en los árboles de eucalipto.'
      },
      {
        question: '¿A quiénes vio Kiko jugar desde lo alto del árbol?',
        options: [
          'A Toby corriendo y a Misi jugando',
          'A un lobo y a un león',
          'A unos patos en un barco'
        ],
        correct: 0,
        explanation: '¡Correcto! Desde arriba vio a sus amigos Toby el perrito y Misi la gatita.'
      },
      {
        question: '¿Cómo saludó Kiko a sus amigos desde las ramas?',
        options: [
          'Levantando su patita peluda',
          'Tirándoles hojas a la cabeza',
          'Gritando con un megáfono'
        ],
        correct: 0,
        explanation: '¡Eso es! Levantó su patita peluda con cariño para saludarles.'
      }
    ]
  },
  {
    id: 7,
    title: 'El arcoíris después de la lluvia',
    petId: 'dog',
    tag: 'Día de lluvia',
    story: 'Una tarde de primavera cayó un chaparrón de lluvia sobre el parque. Toby, Misi y Pompón corrieron a refugiarse juntos bajo el porche de madera. Cuando paró de llover y salió el sol brillante, un arcoíris con siete colores cruzó el cielo azul. ¡Los amigos salieron contentos a chapotear en los charcos con sus botas de agua!',
    reflection: '💭 Para pensar juntos: ¿Te gusta saltar en los charcos cuando llueve? ¿Recuerdas los colores del arcoíris?',
    questions: [
      {
        question: '¿Dónde se refugiaron los animalitos de la lluvia?',
        options: [
          'Bajo el porche de madera',
          'Debajo de una piedra pequeña',
          'Dentro del coche de papá'
        ],
        correct: 0,
        explanation: '¡Bien leído! Corrieron a refugiarse juntos bajo el porche de madera.'
      },
      {
        question: '¿Qué apareció en el cielo azul cuando salió el sol?',
        options: [
          'Un arcoíris con siete colores',
          'Un avión de papel gigante',
          'La luna llena de noche'
        ],
        correct: 0,
        explanation: '¡Eso es! El sol y las gotas de lluvia formaron un precioso arcoíris.'
      },
      {
        question: '¿Qué hicieron las mascotas al terminar la lluvia?',
        options: [
          'Salieron a chapotear en los charcos con botas',
          'Se fueron a dormir enfadados',
          'Se quedaron encerrados todo el día'
        ],
        correct: 0,
        explanation: '¡Genial! Salieron felices a chapotear en los charquitos de agua.'
      }
    ]
  },
  {
    id: 8,
    title: 'La fiesta sorpresa de Toby',
    petId: 'panda',
    tag: 'Celebración y alegría',
    story: 'Chispa y Bao prepararon una fiesta sorpresa para el cumpleaños de Toby. En una gran bandeja colocaron fresas rojas, rodajas de manzana dulce y galletitas con forma de hueso. Cuando Toby llegó con su gorrito de fiesta, todos gritaron: «¡Felicidades!». Toby movió la cola tan rápido de la emoción que parecía un pequeño helicóptero.',
    reflection: '💭 Para pensar juntos: ¿Qué es lo que más te gusta de celebrar los cumpleaños con tu familia y amigos?',
    questions: [
      {
        question: '¿Para quién estaban preparando la fiesta sorpresa?',
        options: [
          'Para el cumpleaños de Toby el perrito',
          'Para la profesora del colegio',
          'Para el abuelo koala'
        ],
        correct: 0,
        explanation: '¡Correcto! Celebraban el cumpleaños de Toby su mejor amigo.'
      },
      {
        question: '¿Qué comida rica pusieron en la bandeja de la fiesta?',
        options: [
          'Fresas rojas, manzana dulce y galletas de hueso',
          'Sopa de verduras caliente',
          'Pescado con espinas'
        ],
        correct: 0,
        explanation: '¡Qué rico! Pusieron fresas, manzana dulce y ricas galletitas.'
      },
      {
        question: '¿Por qué movía Toby la cola tan rápido como un helicóptero?',
        options: [
          'Por la gran emoción y alegría de la fiesta',
          'Porque tenía frío en la cola',
          'Porque quería espantar a una mosca'
        ],
        correct: 0,
        explanation: '¡Exacto! Los perritos mueven la cola con energía cuando están muy felices y agradecidos.'
      }
    ]
  },
  {
    id: 9,
    title: 'Leo y el trueno de la tormenta',
    petId: 'lion',
    tag: 'Superar miedos',
    story: 'Una noche sonó un trueno fuerte que retumbó en las ventanas: ¡BUM! Leo el leoncito se asustó y se metió debajo de su mantita dorada. Su papá se acercó, le dio un abrazo caliente y le explicó que los truenos solo eran nubes jugando a chocar entre ellas. Leo respiró hondo, perdió el miedo y soltó un pequeño rugido de valentía.',
    reflection: '💭 Para pensar juntos: ¿A veces te dan miedo los truenos o la oscuridad? ¿Qué te ayuda a sentirte segura y tranquila?',
    questions: [
      {
        question: '¿Dónde se escondió Leo el leoncito cuando sonó el trueno?',
        options: [
          'Debajo de su mantita dorada',
          'Detrás de una cortina',
          'En el jardín de noche'
        ],
        correct: 0,
        explanation: '¡Muy bien! Se metió bajo su mantita dorada buscando protección.'
      },
      {
        question: '¿Quién ayudó a Leo a calmarse dándole un abrazo?',
        options: [
          'Su papá con mucho cariño',
          'Un vecino desconocido',
          'Nadie, estaba solo'
        ],
        correct: 0,
        explanation: '¡Eso es! Su papá le abrazó y le explicó lo que era la tormenta.'
      },
      {
        question: '¿Qué hizo Leo al final tras perder el miedo?',
        options: [
          'Soltó un pequeño rugido de valentía',
          'Se puso a llorar sin parar',
          'Salió corriendo al bosque'
        ],
        correct: 0,
        explanation: '¡Bravo! Se sintió valiente y seguro y rugió como un verdadero león.'
      }
    ]
  },
  {
    id: 10,
    title: 'El rescate marino de Doly',
    petId: 'dolphin',
    tag: 'Ayuda y solidaridad',
    story: 'Doly el delfín nadaba veloz por los arrecifes de coral cuando oyó un llanto suave. Era un pececito payaso de rayas naranjas atrapado entre unas algas marinas enredadas. Doly nadó despacito con mucho cuidado y empujó suavemente las algas con su hocico hasta liberar al pececito. El pez dio piruetas en el agua agradecido.',
    reflection: '💭 Para pensar juntos: ¿Te gusta ayudar a tus amigos en el colegio cuando se caen o están tristes?',
    questions: [
      {
        question: '¿A quién encontró Doly atrapado entre las algas?',
        options: [
          'A un pececito payaso de rayas naranjas',
          'A un pulpo gigante',
          'A un barco pirata'
        ],
        correct: 0,
        explanation: '¡Bien leído! Encontró al pequeño pez payaso atrapado en las algas.'
      },
      {
        question: '¿Cómo ayudó Doly a liberar al pececito?',
        options: [
          'Empujó suavemente las algas con su hocico',
          'Cortó las algas con tijeras',
          'Le gritó que saliera él solo'
        ],
        correct: 0,
        explanation: '¡Exacto! Con mucha delicadeza empujó las algas con su hocico.'
      },
      {
        question: '¿Cómo demostró el pececito su agradecimiento?',
        options: [
          'Dio piruetas de felicidad en el agua',
          'Se escondió debajo de la arena',
          'Se puso a morder a Doly'
        ],
        correct: 0,
        explanation: '¡Eso es! Hizo piruetas acuáticas saltando de alegría.'
      }
    ]
  },
  {
    id: 11,
    title: 'La biblioteca nocturna de Oli',
    petId: 'owl',
    tag: 'El placer de leer',
    story: 'Cuando las estrellas iluminaban el cielo nocturno, Oli el búho encendía un farolillo amarillo en el hueco de su árbol. Allí guardaba decenas de libros de aventuras y astronomía. A Oli le fascinaba leer historias sobre planetas lejanos mientras el resto del bosque dormía en silencio, aprendiendo cada noche algo nuevo.',
    reflection: '💭 Para pensar juntos: ¿Qué tipo de libros o historias te divierte más leer antes de dormir?',
    questions: [
      {
        question: '¿Cuándo le gusta leer a Oli el búho sabio?',
        options: [
          'Por la noche, bajo las estrellas y con su farolillo',
          'Al mediodía con mucho sol',
          'Solo cuando llueve fuerte'
        ],
        correct: 0,
        explanation: '¡Muy bien! Como es un ave nocturna, lee tranquilo bajo las estrellas.'
      },
      {
        question: '¿Sobre qué temas le fascina leer a Oli en sus libros?',
        options: [
          'Sobre planetas lejanos y aventuras',
          'Sobre cómo construir coches',
          'Sobre recetas de sopa de piedras'
        ],
        correct: 0,
        explanation: '¡Eso es! Adora los libros de aventuras y el espacio exterior.'
      },
      {
        question: '¿Por qué dicen que Oli es un búho sabio?',
        options: [
          'Porque lee mucho y aprende algo nuevo cada noche',
          'Porque lleva gafas de sol',
          'Porque no habla nunca con nadie'
        ],
        correct: 0,
        explanation: '¡Excelente! La lectura diaria es lo que llena de sabiduría a Oli.'
      }
    ]
  },
  {
    id: 12,
    title: 'La carrera tranquila de Tula',
    petId: 'turtle',
    tag: 'Paciencia y constancia',
    story: 'Los animales del bosque organizaron una divertida carrera hasta la colina de los tréboles. La liebre salió corriendo como una flecha, pero se paró a presumir y a comer moras por el camino. Tula la tortuguita avanzaba pasito a pasito sin detenerse ni un minuto. Con calma y constancia, ¡Tula llegó la primera a la meta entre aplausos!',
    reflection: '💭 Para pensar juntos: ¿Por qué tener paciencia y no rendirse nos ayuda a conseguir cosas difíciles?',
    questions: [
      {
        question: '¿A dónde se dirigía la carrera de los animales?',
        options: [
          'A la colina de los tréboles',
          'Al fondo del océano',
          'A la luna'
        ],
        correct: 0,
        explanation: '¡Muy bien leído! La meta era la colina de los tréboles.'
      },
      {
        question: '¿Por qué se retrasó la liebre durante la carrera?',
        options: [
          'Se paró a presumir y a comer moras',
          'Se torció una patita',
          'Se equivocó de camino'
        ],
        correct: 0,
        explanation: '¡Exacto! Se confió, se distrajo presumiendo y comiendo moras.'
      },
      {
        question: '¿Cómo consiguió ganar Tula la tortuguita?',
        options: [
          'Con paso firme, calma y sin detenerse nunca',
          'Pidiéndole un patinete a Toby',
          'Haciendo trampas'
        ],
        correct: 0,
        explanation: '¡La moraleja perfecta! La constancia y el esfuerzo paciente vencen a la prisa.'
      }
    ]
  },
  {
    id: 13,
    title: 'Pinchitos y la manzana gigante',
    petId: 'hedgehog',
    tag: 'Trabajo en equipo',
    story: 'Pinchitos el erizo encontró la manzana roja más grande y jugosa que había visto jamás. Pero pesaba tanto que no podía moverla ni un centímetro. En lugar de rendirse, llamó a Pompón el conejo y a Toby el perrito. Empujando los tres juntos al compás de «¡una, dos y tres!», rodaron la manzana hasta el refugio para merendar juntos.',
    reflection: '💭 Para pensar juntos: ¿Recuerdas alguna tarea que hicisteis en equipo en casa o en el cole que fuera más fácil entre todos?',
    questions: [
      {
        question: '¿Qué fruta gigante encontró Pinchitos en el bosque?',
        options: [
          'Una manzana roja enorme y jugosa',
          'Una sandía verde',
          'Un plátano amarillo'
        ],
        correct: 0,
        explanation: '¡Bien leído! Era una manzana roja gigante y deliciosa.'
      },
      {
        question: '¿Qué hizo Pinchitos al ver que no podía mover la manzana él solo?',
        options: [
          'Llamó a sus amigos para empujar juntos en equipo',
          'Se enfadó y la rompió',
          'Se fue a dormir solo'
        ],
        correct: 0,
        explanation: '¡Eso es! Supo pedir ayuda para trabajar en equipo.'
      },
      {
        question: '¿Qué hicieron con la manzana cuando llegaron al refugio?',
        options: [
          'La compartieron para merendar todos juntos',
          'La tiraron a la basura',
          'La vendieron en el mercado'
        ],
        correct: 0,
        explanation: '¡Qué gran merienda! Compartieron el premio de su esfuerzo.'
      }
    ]
  },
  {
    id: 14,
    title: 'El gran salto de Pipo el pingüino',
    petId: 'penguin',
    tag: 'Superación personal',
    story: 'Pipo el pingüino practicaba saltos en el tobogán de hielo del parque de nieve. Las tres primeras veces resbaló de barriga y cayó al agua con un gracioso chapuzón: ¡ploff! Sus amigos le animaron diciendo: «¡Tú puedes, Pipo!». En el cuarto intento, Pipo tomó carrerilla, saltó alto y aterrizó de pie perfecto como un patinador olímpico.',
    reflection: '💭 Para pensar juntos: Cuando algo no te sale a la primera (como montar en bici o patinar), ¿qué haces para conseguirlo?',
    questions: [
      {
        question: '¿Qué practicaba Pipo en el tobogán de hielo?',
        options: [
          'Saltos y piruetas en el hielo',
          'Cocinar galletas',
          'Volar con alas de plumas'
        ],
        correct: 0,
        explanation: '¡Muy bien! Practicaba saltos en el tobogán resbaladizo.'
      },
      {
        question: '¿Qué le decían sus amigos cuando se cayó las primeras veces?',
        options: [
          'Le animaban diciendo: «¡Tú puedes, Pipo!»',
          'Se reían de él',
          'Le dijeron que se fuera a casa'
        ],
        correct: 0,
        explanation: '¡Qué buenos amigos! Siempre debemos animar a los demás a seguir intentándolo.'
      },
      {
        question: '¿Qué logró Pipo en su cuarto intento gracias a no rendirse?',
        options: [
          'Aterrizar de pie perfecto como un patinador',
          'Romper el tobogán',
          'Quedarse dormido en el agua'
        ],
        correct: 0,
        explanation: '¡Bravo por Pipo! Con práctica y esfuerzo consiguió su salto perfecto.'
      }
    ]
  },
  {
    id: 15,
    title: 'Capi y el baño termal de las naranjas',
    petId: 'capybara',
    tag: 'Paz y armonía (1000 estrellas)',
    story: 'En un manantial de agua tibia en el corazón del bosque vive Capi, la capibara más relajada y sabia del mundo. Cada tarde, Capi se baña tranquilamente flotando con una naranja dulce sobre su cabeza. A su alrededor se sientan pájaros, conejitos y gatitos a disfrutar de su serenidad. Con Capi no existen las prisas, solo la alegría y la paz.',
    reflection: '💭 Para pensar juntos: ¿Qué cosas te hacen sentir tan tranquila y feliz como la capibara en el agua tibia?',
    questions: [
      {
        question: '¿Dónde le gusta bañarse tranquilamente a Capi la capibara?',
        options: [
          'En un manantial de agua tibia',
          'En una piscina con olas gigantes',
          'En un vaso de agua'
        ],
        correct: 0,
        explanation: '¡Excelente! Le encanta flotar en las aguas tibias y termales.'
      },
      {
        question: '¿Qué lleva Capi sobre su cabeza mientras flota relajada?',
        options: [
          'Una naranja dulce y aromática',
          'Un sombrero de copa negro',
          'Una piedra pesada'
        ],
        correct: 0,
        explanation: '¡Qué graciosa! Lleva una rica naranja dorada como la reina del 1000.'
      },
      {
        question: '¿Por qué todos los animales del bosque quieren estar cerca de Capi?',
        options: [
          'Porque les transmite paz, cariño y alegría sin prisas',
          'Porque les regala juguetes caros',
          'Porque les obliga a estar quietos'
        ],
        correct: 0,
        explanation: '¡La lección de la Capibara! Su tranquilidad y buen corazón hacen felices a todos.'
      }
    ]
  }
];
