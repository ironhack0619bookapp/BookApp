// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Post = require("../models/post");
const Book = require("../models/book");

const bcryptSalt = 10;

mongoose
  .connect(process.env.BB_DD_ATLAS, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    User.deleteMany()
      .then(() => {
        return User.create(users)
      })
      .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })

    Book.deleteMany()
      .then(() => {
        return Book.create(books)
      })
      .then(booksCreated => {
        console.log(`${booksCreated.length} book created with the following id:`);
        console.log(booksCreated.map(u => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Alice Mars",
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@yahoo.es",
    phone: "625901738",
    address: "Barcelona, España",
    imgName: "",
    imgPath: "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Bob Lirem",
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob1979@gmail.com",
    phone: "639023421",
    address: "Sevilla, España",
    imgName: "",
    imgPath: "https://data.whicdn.com/images/55805982/large.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Arlem Basim",
    username: "arlem",
    password: bcrypt.hashSync("arlem", bcrypt.genSaltSync(bcryptSalt)),
    email: "arlem@icloud.com",
    phone: "638923724",
    address: "Leganes, España",
    imgName: "",
    imgPath: "https://i.ebayimg.com/images/g/IIEAAOSwBt5ZNIwr/s-l1600.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Anne Grisley",
    username: "anne",
    password: bcrypt.hashSync("anne", bcrypt.genSaltSync(bcryptSalt)),
    email: "anne_gr_88@gmail.com",
    phone: "637826335",
    address: "Mallorca, España",
    imgName: "",
    imgPath: "http://www.allsparkfireworks.com/blog/wp-content/uploads/2014/03/firework-sparkler-girl.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Jose Mendez",
    username: "jose",
    password: bcrypt.hashSync("jose", bcrypt.genSaltSync(bcryptSalt)),
    email: "josemen77_1@hotmail.com",
    phone: "689002318",
    address: "Pontevedra, España",
    imgName: "",
    imgPath: "https://a.deviantart.net/avatars-big/v/a/vampir-cat.jpg?4",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Admin",
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt)),
    email: "admin@bookapp.com",
    phone: "666666666",
    address: "Madrid, España",
    imgName: "",
    imgPath: "https://icreatived.com/wp-content/uploads/2014/10/Interesting-Creative-Facebook-Profile-Picture-Ideas-25.jpg",
    type: "admin",
    status: "Active",
  },
  {
    name: "Federico Sila",
    username: "federico",
    password: bcrypt.hashSync("federico", bcrypt.genSaltSync(bcryptSalt)),
    email: "fede_si86@icloud.com",
    phone: "659037784",
    address: "Caceres, España",
    imgName: "",
    imgPath: "https://thewondrous.com/wp-content/uploads/2015/07/beautiful-profile-pics.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Javier Lanza",
    username: "javier",
    password: bcrypt.hashSync("javier", bcrypt.genSaltSync(bcryptSalt)),
    email: "javi.lanz@gmail.com",
    phone: "690883482",
    address: "Murcia, España",
    imgName: "",
    imgPath: "https://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-natural-7.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Christian Gonzalez",
    username: "christian",
    password: bcrypt.hashSync("christian", bcrypt.genSaltSync(bcryptSalt)),
    email: "chrisgon@outlook.com",
    phone: "689332401",
    address: "Valencia, España",
    imgName: "",
    imgPath: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/01/Nature-Profile-Picture-1-300x241.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
  {
    name: "Isis García",
    username: "isis",
    password: bcrypt.hashSync("isis", bcrypt.genSaltSync(bcryptSalt)),
    email: "isis_garter1979@outlook.com",
    phone: "666903286",
    address: "Cuenca, España",
    imgName: "",
    imgPath: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/nature-profile5-300x289.jpg",
    type: "user",
    token: "",
    status: "Active",
  },
]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

let books = [
  {
    title: "Sinsajo / Mockingjay",
    author: "Suzanne Collins",
    description: "Katnis Everdeen ha sobrevivido dos veces a Los juegos del hambre, pero no está a salvo. La revolución se extiende y, al parecer, todos han tenido algo que ver en el meticuloso plan, todos excepto Katniss. Aun así su papel en la batalla final es el más importante de todos. Katniss debe convertirse en el Sinsajo, en el símbolo de la rebelión... a cualquier precio. ¡Que empiecen los septuagésimo sextos juegos del hambre!",
    isbn: "9788427202146",
    image: "http://books.google.com/books/content?id=Mn2ctgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    title: "El Secreto (The Secret)",
    author: "Rhonda Byrne",
    description: "La edición especial del 10° Aniversario del libro que transformó vidas, ahora con un nuevo prólogo y revelaciones de Rhonda Byrne. En el 2006, un largometraje revolucionario reveló el gran misterio del universo—El Secreto—y, luego, Rhonda Byrne lo siguió con un libro que se convirtió en uno de los libros más vendidos mundialmente. El Secreto siempre ha estado parcialmente presente en las tradiciones orales, en la literatura, en las religiones y en las distintas filosofías de todos los tiempos. Por primera vez, todos estos fragmentos han sido reunidos en una increíble revelación que transformará la vida de todo aquel que lo experimente. En este libro aprenderás a cómo utilizar El Secreto en todos los aspectos de tu vida: dinero, salud, relaciones, felicidad y en todas tus interacciones con el mundo. Empezarás a entender el poder oculto que hay en tu interior, El Secreto te traerá felicidad en todas las áreas de tu vida. El Secreto encierra la sabiduría de los grandes maestros actuales-quienes lo han utilizado para conseguir salud, fortuna y felicidad. Al aplicar el conocimiento de El Secreto los maestros nos revelan increíbles historias de sanación, de generación de riqueza económica, de superación de obstáculos y de cómo alcanzar cualquier logro que pueda calificarse de imposible.",
    isbn: "9781439102718",
    image: "http://books.google.com/books/content?id=zrEuXdpGv68C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "El código Da Vinci (Nueva Edición)",
    author: "Dan Brown",
    description: "El profesor de simbología religiosa de la Universidad de Harvard Robert Langdon se encuentra en París dando una conferencia. En la recepción que tiene lugar a continuación tiene una cita con el prestigioso comisario del museo del Louvre, pero éste nunca aparece. Horas más tarde, el profesor recibe una llamada: el comisario ha sido encontrado muerto y la policía francesa requiere de sus servicios. Langdon es conducido al Louvre y allí descubre que la víctima ha dejado un mensaje cifrado en la escena del crimen. Convertido en el sospechoso principal, Langdon debe descifrar, junto a la criptóloga francesa Sophie Neveu, una serie de pistas que han sido dejadas específicamente para ellos. Si no consiguen resolver el puzzle a tiempo, un secreto milenario podría perderse para siempre, y sus vidas peligrarían. «Espero sinceramente que esta adaptación de El código Da Vinci provoque en nuevos lectores el mismo entusiasmo que siento al explorar la historia secreta y los misterios del mundo en el que vivimos.» Dan Brown.",
    isbn: "9788408164227",
    image: "http://books.google.com/books/content?id=iHkPDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    description: "Harry vive con sus horribles tíos y el insoportable primo Dudley, hasta que su ingreso en el Colegio Hogwarts de Magia y Hechicería cambia su vida para siempre. Allí aprenderá trucos y encantamientos fabulosos, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Y, sobre todo, conocerá los secretos que lo ayudarán a cumplir con su destino.",
    isbn: "9781781101315",
    image: "http://books.google.com/books/content?id=2zgRDXFWkm8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "La Chica Del Tren",
    author: "Paula Hawkins",
    description: "¿Estabas en el tren de las 8.04? ¿Viste algo sospechoso? Rachel, sí. Rachel toma siempre el tren de las 8.04 h. Cada mañana lo mismo: el mismo paisaje, las mismas casas... y la misma parada en la señal roja. Son solo unos segundos, pero le permiten observar a una pareja desayunando tranquilamente en su terraza. Siente que los conoce y se inventa unos nombres para ellos: Jess y Jason. Su vida es perfecta, no como la suya. Pero un día ve algo. Sucede muy deprisa, pero es suficiente. ¿Y si Jess y Jason no son tan felices como ella cree? ¿Y si nada es lo que parece?. Tú no la conoces. Ella a ti, sí.",
    isbn: "9786070728389",
    image: "http://books.google.com/books/content?id=yA5drgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    title: "Los pilares de la Tierra (Saga Los pilares de la Tierra 1)",
    author: "Ken Follett",
    description: "Los pilares de la Tierra es la obra maestra de Ken Follett y constituye una excepcional evocación de una época de violentas pasiones. Esta edición de Los pilares de la Tierra incluye un prólogo del autor con motivo del 25.o aniversario de la publicación. El gran maestro de la narrativa de acción y suspense nos transporta a la Edad Media, a un fascinante mundo de reyes, damas, caballeros, pugnas feudales, castillos y ciudades amuralladas. El amor y la muerte se entrecruzan vibrantemente en este magistral tapiz cuyo centro es la construcción de una catedral gótica. La historia se inicia con el ahorcamiento público de un inocente y finaliza con la humillación de un rey. Reseñas: «Fantástico desde todos los puntos de vista.» El Mundo «Los pilares de la Tierra fue un hito en España, donde todavía sigue siendo el libro más leído de la historia según la Federación del Gremio de Editores.» ABC «Alta política y bajas pasiones (y viceversa) conforman un folletín de grandes dimensiones que confirman a Follett como relojero mayor del reino del bestseller.» Qué leer «Maravilloso... Te atrapará, fascinará y envolverá.» Chicago Tribune «Los pilares de la Tierra hizo de Ken Follet uno de los autores más queridos de nuestro país.» ABC Sevilla «Ken Follett sabe cómo tejer una historia fascinante, con personajes complejos, que todo actor sueña con interpretar.» Donald Sutherland «Me encanta Los pilares de la Tierra, lo recuerdo con mucho cariño [...] es uno de aquellos títulos que se quedan grabados...» Ildefonso Falcones «En Los pilares de la Tierra, Ken Follett nos presenta a unos personajes que consiguen que la historia cobre vida.» Ridley Scott Los lectores opinan... «Mi libro favorito.» Ana María «Lo he leído tres veces, es fascinante.» Dolores «Un libro que, sin duda, está entre mis favoritos.» Alexander «¡Gran obra!» Andrés «Una historia fantástica, inolvidable.» Faby Reseñas: «Fantástico desde todos los puntos de vista.» El Mundo «Los pilares de la Tierra fue un hito en España, donde todavía sigue siendo el libro más leído de la historia según la Federación del Gremio de Editores.» ABC «Alta política y bajas pasiones (y viceversa) conforman un folletín de grandes dimensiones que confirman a Follett como relojero mayor del reino del bestseller.» Qué leer «Maravilloso... Te atrapará, fascinará y envolverá.» Chicago Tribune «Los pilares de la Tierra hizo de Ken Follet uno de los autores más queridos de nuestro país.» ABC Sevilla «Ken Follett sabe cómo tejer una historia fascinante, con personajes complejos, que todo actor sueña con interpretar.» Donald Sutherland «Me encanta Los pilares de la Tierra, lo recuerdo con mucho cariño [...] es uno de aquellos títulos que se quedan grabados...» Ildefonso Falcones «En Los pilares de la Tierra, Ken Follett nos presenta a unos personajes que consiguen que la historia cobre vida.» Ridley Scott Los lectores opinan... «Mi libro favorito.» Ana María «Lo he leído tres veces, es fascinante.» Dolores «Un libro que, sin duda, está entre mis favoritos.» Alexander «¡Gran obra!» Andrés «Una historia fantástica, inolvidable.» Faby.",
    isbn: "9788401338359",
    image: "http://books.google.com/books/content?id=mKoInmOU130C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "El médico (Edición película)",
    author: "Noah Gordon",
    description: "Un joven aprendiz de médico con un don para sanar nunca visto recorrerá la Europa sombría y oscura del siglo XI hasta la fascinante Persia, para encontrarse con el mejor maestro imaginable: el mítico Avicena. Rob J. Cole, un joven londinense del siglo...",
    isbn: "9788499188409",
    image: "http://books.google.com/books/content?id=k2E3AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "La catedral del mar",
    author: "Ildefonso Falcones",
    description: "Nueva edición del gran fenómeno editorial: La catedral del mar, de Ildefonso Falcones, con prólogo del autor. Una catedral construida por el pueblo y para el pueblo en la Barcelona medieval es el escenario de una apasionante historia de intriga, violencia y pasión. Siglo XIV. La ciudad de Barcelona se encuentra en su momento de mayor prosperidad; ha crecido hacia la Ribera, el humilde barrio de los pescadores, cuyos habitantes deciden construir, con el dinero de unos y el esfuerzo de otros, el mayor templo mariano jamás conocido: Santa María de la Mar. Una construcción que es paralela a la azarosa historia de Arnau, un siervo de la tierra que huye de los abusos de su señor feudal y se refugia en Barcelona, donde se convierte en ciudadano y, con ello, en hombre libre. El joven Arnau trabaja como palafrenero, estibador, soldado y cambista. Una vida extenuante, siempre al amparo de la catedral de la mar, que le iba a llevar de la miseria del fugitivo a la nobleza y la riqueza. Pero con esta posición privilegiada también le llega la envidia de sus pares, que urden una sórdida conjura que pone su vida en manos de la Inquisición... La catedral del mar es una trama en la que se entrecruzan lealtad y venganza, traición y amor, guerra y peste, en un mundo marcado por la intolerancia religiosa, la ambición material y la segregación social. Todo ello convierte esta obra no sólo en una novela absorbente, sino también en la más fascinante y ambiciosa recreación de las luces y sombras de la época feudal. La crítica ha dicho... «Un relato que se lee con la misma avidez con que se ha escrito y que uno quisiera prolongar aun sabiendo que ha terminado. Un retablo de maravillas.» José Enrique Ruiz-Domènec, La Vanguardia «La catedral del mar va a despertar pasiones entre lectores de todo tipo, y con justicia. Ojalá todos los bestsellers fueran como éste.» Care Santos, El Mundo «Una trama generosa en secretos y traiciones... Una notable historia de autosuperación.» Ricard Ruiz Garzón, El Periódico «Barcelona ya tiene su Los pilares de la Tierra.» Qué Leer.",
    isbn: "9788425344459",
    image: "http://books.google.com/books/content?id=rGiK6426V_AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "Dispara, yo ya estoy muerto",
    author: "Julia Navarro",
    description: "Dispara, yo ya estoy muerto es una historia llena de historias, una gran novela que esconde muchas novelas y que, desde su enigmático título hasta su inesperado final, alberga más de una sorpresa y emociones a flor de piel. Hay momentos en la vida en los que la única manera de salvarse a uno mismo es muriendo o matando. A finales del siglo XIX, durante la última etapa zarista, los Zucker, perseguidos por su condición de judíos, tienen que abandonar Rusia huyendo del horror y la sinrazón. A su llegada a la Tierra Prometida, Samuel Zucker adquiere las tierras de los Ziad, una familia árabe encabezada por Ahmed. Entre él y Samuel nace un fuerte vínculo, una sólida amistad que, por encima de las diferencias religiosas y políticas, se mantiene generación tras generación. Con las amenazas, la sed de venganza y muchas pasiones desatadas como telón de fondo, las vidas entrecruzadas de losZucker y los Ziad conforman un mosaico de traiciones y sufrimientos, de amores posibles e imposibles, al tiempo que plasman la gran aventura de vivir y convivir en un territorio marcado por la intolerancia. Intensa y conmovedora crónica de dos sagas familiares, esta novela de Julia Navarro nos adentra en las vidas de personas con nombres y apellidos, que luchan por alcanzar sus sueños y que son responsables de su propio destino. «Los personajes de esta novela viven conmigo, me han enseñado mucho, forman parte ya de mi historia personal.» Julia Navarro La crítica ha dicho... «La novela más compleja de Julia Navarro. Casi mil páginas que mezclan historia y suspense, drama y política. Una obra decimonónica en pleno siglo XXI.» J. M. Pozuelo Yvancos, ABC Cultural «Una novela de personajes, unas criaturas en gran medida presas de su época y de los vaivenes históricos de ésta. Un relato ambicioso que se inicia a finales del siglo XIX y llega hasta 1948 recorriendo algunos de los sucesos más importantes de la historia contemporánea.» AreaLibros «Una intensa y emocionada crónica de una saga familiar que ahonda en el vértigo de la condición humana al tiempo que propone una conmovedora reivindicación de que por encima de las patrias están las personas.» La Región Los lectores han dicho... «Las vidas entrecruzadas de los Zucker y los Ziad conforman un mosaico de traiciones y sufrimientos, de amores posibles e imposibles, al tiempo que plasman la gran aventura de vivir y convivir en un territorio marcado por la intolerancia. Intensa y conmovedora crónica de dos sagas familiares, esta novela de Julia Navarro nos adentra en las vidas de personas con nombres y apellidos, que luchan por alcanzar sus sueños y que son responsables de su propio destino.»",
    isbn: "9788401342271",
    image: "http://books.google.com/books/content?id=wQkOAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    title: "Palmeras en la nieve",
    author: "Luz Gabás",
    description: "Es 1953 y Kilian abandona la nieve de la montaña oscense para iniciar junto a su hermano, Jacobo, el viaje de ida hacia una tierra desconocida, lejana y exótica, la isla de Fernando Poo. En las entrañas de este territorio exuberante y seductor, le espera su padre, un veterano de la finca Sampaka, el lugar donde se cultiva y tuesta uno de los mejores cacaos del mundo. En esa tierra eternamente verde, cálida y voluptuosa, los jóvenes hermanos descubren la ligereza de la vida social de la colonia en comparación con una España encorsetada y gris; comparten el duro trabajo necesario para conseguir el cacao perfecto de la finca Sampaka; aprenden las diferencias y similitudes culturales entre coloniales y autóctonos; y conocen el significado de la amistad, la pasión, el amor y el odio. Pero uno de ellos cruzará una línea prohibida e invisible y se enamorará perdidamente de una nativa. Su amor por ella, enmarcado en unas complejas circunstancias históricas, y el especial vínculo que se crea entre el colono y los oriundos de la isla transformarán la relación de los hermanos, cambiarán el curso de sus vidas y serán el origen de un secreto cuyas consecuencias alcanzarán el presente. En el año 2003, Clarence, hija y sobrina de ese par de hermanos, llevada por la curiosidad del que desea conocer sus orígenes, se zambulle en el ruinoso pasado que habitaron Kilian y Jacobo y descubre los hilos polvorientos de ese secreto que finalmente será desentrañado. Un excelente relato que recupera nuestras raíces coloniales y una extraordinaria y conmovedora historia de amor prohibido con resonancias de Memorias de áfrica.",
    isbn: "9788499980232",
    image: "http://books.google.com/books/content?id=w7Mr1PpSMIcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
]

// Book.deleteMany()
//   .then(() => {
//     return Book.create(books)
//   })
//   .then(booksCreated => {
//     console.log(`${booksCreated.length} book created with the following id:`);
//     console.log(booksCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })

let posts = [
  {
    title: "Sinsajo / Mockingjay",
    price: 14,
    description: "Suzanne Collins",
    type: "intercambio",
    description: "Katnis Everdeen ha sobrevivido dos veces a Los juegos del hambre, pero no está a salvo. La revolución se extiende y, al parecer, todos han tenido algo que ver en el meticuloso plan, todos excepto Katniss. Aun así su papel en la batalla final es el más importante de todos. Katniss debe convertirse en el Sinsajo, en el símbolo de la rebelión... a cualquier precio. ¡Que empiecen los septuagésimo sextos juegos del hambre!"
  },
  {
    title: "Juego De Tronos",
    price: 50,
    description: "George RR Martin",
    type: "venta",
    description: "Tras el largo verano, el invierno se acerca a los Siete Reinos. Lord Eddars Stark, señor de Invernalia, deja sus dominios para unirse a la corte del rey Robert Baratheon el Usurpador, hombre díscolo y otrora guerrero audaz cuyas mayores aficiones son comer, beber y engendrar bastardos. Eddard Stark desempeñará el cargo de Mano del Rey e intentará desentrañar una maraña de intrigas que pondrá en peligro su vida... y la de los suyos."
  },
  {
    title: "Los Juegos Del Hambre",
    price: 23,
    description: "Suzanne Collins",
    type: "venta",
    description: "En lo que alguna vez fue Norteamérica, la Capital de Panem mantiene sus 12 distritos obligándolos a seleccionar a un niño y a una niña, llamados Tributos, a competir en un evento televisado nacionalmente llamado los Juegos del Hambre. Cada ciudadano debe ver pelear a muerte a los jóvenes. El Tributo del Distrito 12, Katniss Everdeen, solo confía en sus habilidades de caza y buenos instintos en una arena en donde debe sobrevivir contra la humanidad."
  },
  {
    title: "Harry Potter y La Piedra Filosofal",
    price: 17,
    description: "JK Rowling",
    type: "intercambio",
    description: "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee."
  },
  {
    title: "El Juego Del Ángel",
    price: 8,
    description: "Carlos Ruíz Zafón",
    type: "venta",
    description: " En la turbulenta Barcelona de los años 20 un joven escritor obsesionado con un amor imposible recibe la oferta de un misterioso editor para escribir un libro como no ha existido nunca, a cambio de una fortuna y, tal vez, mucho más."
  },
]

// Post.deleteMany()
// .then(() => {
//   return Post.create(posts)
// })
// .then(postsCreated => {
//   console.log(`${postsCreated.length} post created with the following id:`);
//   console.log(postsCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })