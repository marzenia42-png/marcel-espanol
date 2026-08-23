/* vocab.js — słownik aplikacji. `id` jest kluczem dla SRS i lekcji.
   chunk:true = gotowy zwrot do zapamiętania w całości.                         */

export const VOCAB = [
  /* --- U1: Powitania --- */
  { id: 'hola', es: 'hola', pl: 'cześć', ex: '¡Hola! ¿Qué tal?' },
  { id: 'adios', es: 'adiós', pl: 'do widzenia', ex: 'Adiós, hasta mañana.' },
  { id: 'buenos-dias', es: 'buenos días', pl: 'dzień dobry (rano)', ex: 'Buenos días, señora.' },
  { id: 'buenas-tardes', es: 'buenas tardes', pl: 'dzień dobry (po południu)', ex: 'Buenas tardes a todos.' },
  { id: 'buenas-noches', es: 'buenas noches', pl: 'dobry wieczór / dobranoc', ex: 'Buenas noches, hasta mañana.' },
  { id: 'gracias', es: 'gracias', pl: 'dziękuję', ex: 'Muchas gracias.' },
  { id: 'de-nada', es: 'de nada', pl: 'nie ma za co', ex: '— Gracias. — De nada.', chunk: true },
  { id: 'por-favor', es: 'por favor', pl: 'proszę (o coś)', ex: 'Un café, por favor.', chunk: true },
  { id: 'si', es: 'sí', pl: 'tak', ex: 'Sí, claro.' },
  { id: 'no', es: 'no', pl: 'nie', ex: 'No, gracias.' },
  { id: 'perdon', es: 'perdón', pl: 'przepraszam', ex: 'Perdón, ¿dónde está el baño?' },
  { id: 'hasta-luego', es: 'hasta luego', pl: 'do zobaczenia', ex: 'Hasta luego, Marcel.', chunk: true },
  { id: 'mucho-gusto', es: 'mucho gusto', pl: 'miło mi', ex: 'Mucho gusto, soy Ana.', chunk: true },
  { id: 'como-estas', es: '¿cómo estás?', pl: 'jak się masz?', ex: 'Hola, ¿cómo estás?', chunk: true },
  { id: 'bien', es: 'bien', pl: 'dobrze', ex: 'Estoy muy bien.' },
  { id: 'mal', es: 'mal', pl: 'źle', ex: 'Hoy estoy mal.' },
  { id: 'regular', es: 'regular', pl: 'tak sobie', ex: '— ¿Qué tal? — Regular.' },

  /* --- U2: Ja i ty --- */
  { id: 'me-llamo', es: 'me llamo', pl: 'nazywam się', ex: 'Me llamo Marcel.', chunk: true },
  { id: 'yo', es: 'yo', pl: 'ja', ex: 'Yo soy estudiante.' },
  { id: 'tu', es: 'tú', pl: 'ty', ex: '¿Y tú?' },
  { id: 'el', es: 'él', pl: 'on', ex: 'Él es mi hermano.' },
  { id: 'ella', es: 'ella', pl: 'ona', ex: 'Ella es mi amiga.' },
  { id: 'soy', es: 'soy', pl: '(ja) jestem', ex: 'Yo soy de Polonia.' },
  { id: 'eres', es: 'eres', pl: '(ty) jesteś', ex: 'Tú eres simpático.' },
  { id: 'es', es: 'es', pl: '(on/ona) jest', ex: 'Ella es profesora.' },
  { id: 'de-donde-eres', es: '¿de dónde eres?', pl: 'skąd jesteś?', ex: 'Hola, ¿de dónde eres?', chunk: true },
  { id: 'soy-de', es: 'soy de', pl: 'jestem z', ex: 'Soy de Cracovia.', chunk: true },
  { id: 'polonia', es: 'Polonia', pl: 'Polska', ex: 'Soy de Polonia.' },
  { id: 'espana', es: 'España', pl: 'Hiszpania', ex: 'Ella es de España.' },
  { id: 'polaco', es: 'polaco', pl: 'Polak / polski', ex: 'Yo soy polaco.' },
  { id: 'espanol', es: 'español', pl: 'Hiszpan / hiszpański', ex: 'Él es español.' },
  { id: 'estudiante', es: 'estudiante', pl: 'uczeń / student', ex: 'Soy estudiante.' },
  { id: 'amigo', es: 'amigo', pl: 'przyjaciel', ex: 'Es mi amigo.' },
  { id: 'y-tu', es: 'y tú', pl: 'a ty?', ex: 'Bien, ¿y tú?', chunk: true },
  { id: 'tambien', es: 'también', pl: 'też', ex: 'Yo también soy de Polonia.' },
  { id: 'encantado', es: 'encantado', pl: 'miło mi (poznać)', ex: 'Encantado, soy Marcel.' },

  /* --- U3: Rodzina i liczby --- */
  { id: 'familia', es: 'la familia', pl: 'rodzina', ex: 'Mi familia es grande.' },
  { id: 'madre', es: 'la madre', pl: 'matka', ex: 'Mi madre se llama Beata.' },
  { id: 'padre', es: 'el padre', pl: 'ojciec', ex: 'Mi padre trabaja mucho.' },
  { id: 'hermano', es: 'el hermano', pl: 'brat', ex: 'Tengo un hermano.' },
  { id: 'hermana', es: 'la hermana', pl: 'siostra', ex: 'Mi hermana es pequeña.' },
  { id: 'hijo', es: 'el hijo', pl: 'syn', ex: 'Es el hijo de Ana.' },
  { id: 'hija', es: 'la hija', pl: 'córka', ex: 'Tienen una hija.' },
  { id: 'tengo', es: 'tengo', pl: '(ja) mam', ex: 'Tengo dos hermanos.' },
  { id: 'tienes', es: 'tienes', pl: '(ty) masz', ex: '¿Cuántos años tienes?' },
  { id: 'tiene', es: 'tiene', pl: '(on/ona) ma', ex: 'Ella tiene un perro.' },
  { id: 'mi', es: 'mi', pl: 'mój / moja', ex: 'Mi hermano es alto.' },
  { id: 'cuantos-anos', es: '¿cuántos años tienes?', pl: 'ile masz lat?', ex: '¿Cuántos años tienes? — Dieciocho.', chunk: true },
  { id: 'anos', es: 'años', pl: 'lata (wiek)', ex: 'Tengo dieciocho años.' },
  { id: 'cero', es: 'cero', pl: '0', ex: 'cero, uno, dos' },
  { id: 'uno', es: 'uno', pl: '1', ex: 'Tengo un hermano.' },
  { id: 'dos', es: 'dos', pl: '2', ex: 'dos cafés' },
  { id: 'tres', es: 'tres', pl: '3', ex: 'tres amigos' },
  { id: 'cuatro', es: 'cuatro', pl: '4', ex: 'cuatro gatos' },
  { id: 'cinco', es: 'cinco', pl: '5', ex: 'cinco euros' },
  { id: 'seis', es: 'seis', pl: '6', ex: 'seis días' },
  { id: 'siete', es: 'siete', pl: '7', ex: 'siete horas' },
  { id: 'ocho', es: 'ocho', pl: '8', ex: 'ocho años' },
  { id: 'nueve', es: 'nueve', pl: '9', ex: 'nueve euros' },
  { id: 'diez', es: 'diez', pl: '10', ex: 'diez minutos' },
  { id: 'once', es: 'once', pl: '11', ex: 'once años' },
  { id: 'doce', es: 'doce', pl: '12', ex: 'doce meses' },
  { id: 'trece', es: 'trece', pl: '13', ex: 'trece euros' },
  { id: 'catorce', es: 'catorce', pl: '14', ex: 'catorce días' },
  { id: 'quince', es: 'quince', pl: '15', ex: 'quince minutos' },
  { id: 'veinte', es: 'veinte', pl: '20', ex: 'veinte euros' },

  /* --- U4: Jedzenie i picie --- */
  { id: 'agua', es: 'el agua', pl: 'woda', ex: 'Un agua, por favor.' },
  { id: 'cafe', es: 'el café', pl: 'kawa', ex: 'Quiero un café.' },
  { id: 'pan', es: 'el pan', pl: 'chleb', ex: 'El pan está rico.' },
  { id: 'quiero', es: 'quiero', pl: '(ja) chcę', ex: 'Quiero una pizza.' },
  { id: 'la-cuenta', es: 'la cuenta', pl: 'rachunek', ex: 'La cuenta, por favor.', chunk: true },
  { id: 'rico', es: 'rico', pl: 'smaczny', ex: '¡Está muy rico!' },

  /* --- U5: W mieście --- */
  { id: 'donde-esta', es: '¿dónde está?', pl: 'gdzie jest?', ex: '¿Dónde está el baño?', chunk: true },
  { id: 'bano', es: 'el baño', pl: 'łazienka / toaleta', ex: '¿Dónde está el baño?' },
  { id: 'calle', es: 'la calle', pl: 'ulica', ex: 'Vivo en esta calle.' },
  { id: 'aqui', es: 'aquí', pl: 'tutaj', ex: 'Estoy aquí.' },
  { id: 'izquierda', es: 'a la izquierda', pl: 'w lewo', ex: 'Gira a la izquierda.', chunk: true },
  { id: 'derecha', es: 'a la derecha', pl: 'w prawo', ex: 'Está a la derecha.', chunk: true },

  /* --- U6: Czas i dzień --- */
  { id: 'hoy', es: 'hoy', pl: 'dzisiaj', ex: 'Hoy estudio español.' },
  { id: 'manana', es: 'mañana', pl: 'jutro / rano', ex: 'Mañana trabajo.' },
  { id: 'ahora', es: 'ahora', pl: 'teraz', ex: 'Ahora no puedo.' },
  { id: 'que-hora-es', es: '¿qué hora es?', pl: 'która godzina?', ex: '¿Qué hora es? — Son las tres.', chunk: true },
  { id: 'todos-los-dias', es: 'todos los días', pl: 'codziennie', ex: 'Estudio todos los días.', chunk: true },

  /* --- U7: Zakupy --- */
  { id: 'cuanto-cuesta', es: '¿cuánto cuesta?', pl: 'ile kosztuje?', ex: '¿Cuánto cuesta esto?', chunk: true },
  { id: 'euro', es: 'el euro', pl: 'euro', ex: 'Cuesta cinco euros.' },
  { id: 'caro', es: 'caro', pl: 'drogi', ex: 'Es muy caro.' },
  { id: 'barato', es: 'barato', pl: 'tani', ex: 'Es barato.' },

  /* --- U8: Czas wolny (gustar) --- */
  { id: 'me-gusta', es: 'me gusta', pl: 'lubię / podoba mi się', ex: 'Me gusta el fútbol.', chunk: true },
  { id: 'no-me-gusta', es: 'no me gusta', pl: 'nie lubię', ex: 'No me gusta el café.', chunk: true },
  { id: 'futbol', es: 'el fútbol', pl: 'piłka nożna', ex: 'Me gusta el fútbol.' },
  { id: 'musica', es: 'la música', pl: 'muzyka', ex: 'Me gusta la música.' },

  /* --- U9: Plany (ir a) --- */
  { id: 'ir-a', es: 'ir a', pl: 'zamierzać (coś zrobić)', ex: 'Voy a estudiar.', chunk: true },
  { id: 'voy', es: 'voy', pl: '(ja) idę / jadę', ex: 'Voy a casa.' },
  { id: 'quiero-ir', es: 'quiero ir', pl: 'chcę iść / jechać', ex: 'Quiero ir a España.', chunk: true },

  /* --- U10: Przeszłość --- */
  { id: 'ayer', es: 'ayer', pl: 'wczoraj', ex: 'Ayer comí paella.' },
  { id: 'comi', es: 'comí', pl: '(ja) zjadłem', ex: 'Ayer comí mucho.' },
  { id: 'fui', es: 'fui', pl: '(ja) byłem / poszedłem', ex: 'Ayer fui al cine.' },

  /* --- Chunki gramatyczne (przydatne zwroty) --- */
  { id: 'tener-que', es: 'tener que', pl: 'musieć (coś zrobić)', ex: 'Tengo que estudiar.', chunk: true },
  { id: 'tener-ganas-de', es: 'tener ganas de', pl: 'mieć ochotę na', ex: 'Tengo ganas de viajar.', chunk: true },
  { id: 'hay-que', es: 'hay que', pl: 'trzeba (bezosobowo)', ex: 'Hay que practicar.', chunk: true },
  { id: 'me-gustaria', es: 'me gustaría', pl: 'chciałbym', ex: 'Me gustaría un café.', chunk: true },
  { id: 'acabar-de', es: 'acabar de', pl: 'właśnie coś zrobić', ex: 'Acabo de llegar.', chunk: true }
];

/** Szybki dostęp po id. */
export const VOCAB_BY_ID = Object.fromEntries(VOCAB.map((v) => [v.id, v]));
