/* lessons_extra.js — 2. lekcje jednostek 4–10 (dobudowa falą 2).
   Doklejane do UNITS w lessons.js. Każda lekcja = 10 ćwiczeń.                    */

export const EXTRA = {
  4: [{
    id: 'u4l2', unit: 4, title: 'En el restaurante', subtitle: 'Zamawianie w barze i restauracji',
    exercises: [
      { type: 'match', pairs: [{ es: 'la carta', pl: 'menu / karta' }, { es: 'la cuenta', pl: 'rachunek' }, { es: 'el camarero', pl: 'kelner' }, { es: 'el postre', pl: 'deser' }] },
      { type: 'mc', prompt: 'Jak poprosisz kelnera o menu?', q: '¿…, por favor?', options: ['La carta', 'La cuenta', 'El postre', 'El agua'], answer: 'La carta', word: 'u4-carta', say: 'La carta, por favor.' },
      { type: 'fill', q: 'De primero ___ una sopa, por favor.', options: ['quiero', 'gira', 'cerca', 'hoy'], answer: 'quiero', word: 'u4-quiero', say: 'De primero quiero una sopa, por favor.' },
      { type: 'translate', dir: 'es-pl', q: 'La cuenta, por favor.', accept: ['rachunek proszę', 'rachunek prosze', 'poproszę rachunek', 'poprosze rachunek', 'rachunek, proszę'], answer: 'Rachunek, proszę.', word: 'u4-la-cuenta', say: 'La cuenta, por favor.' },
      { type: 'mc', prompt: 'Co znaczy „de segundo"?', q: 'de segundo', options: ['na drugie danie', 'na deser', 'na pierwsze danie', 'rachunek'], answer: 'na drugie danie', word: 'u4-de-segundo', say: 'De segundo, pollo con patatas.' },
      { type: 'build', prompt: 'Ułóż zdanie: „Poproszę małe piwo, proszę."', answer: ['Me', 'pone', 'una', 'caña,', 'por', 'favor.'], say: 'Me pone una caña, por favor.', word: 'u4-me-pone' },
      { type: 'speak', q: 'De postre quiero un helado.', word: 'u4-postre', say: 'De postre quiero un helado.' },
      { type: 'translate', dir: 'pl-es', q: 'Poproszę wodę.', accept: ['quiero agua', 'quiero un agua', 'me pone un agua', 'un agua por favor', 'agua por favor'], answer: 'Quiero un agua, por favor.', word: 'u4-agua' },
      { type: 'fill', q: 'Muchas ___, camarero.', options: ['gracias', 'recto', 'lejos', 'media'], answer: 'gracias', word: 'u4-gracias', say: 'Muchas gracias, camarero.' },
      { type: 'mc', prompt: 'Kto przynosi jedzenie w restauracji?', q: '¿Quién trae la comida?', options: ['el camarero', 'la carta', 'el postre', 'la cuenta'], answer: 'el camarero', word: 'u4-camarero', say: 'El camarero trae la comida.' }
    ]
  }],
  5: [{
    id: 'u5l2', unit: 5, title: 'En la ciudad', subtitle: 'Kierunki i miejsca w mieście',
    exercises: [
      { type: 'match', pairs: [{ es: 'todo recto', pl: 'prosto' }, { es: 'a la derecha', pl: 'w prawo' }, { es: 'a la izquierda', pl: 'w lewo' }, { es: 'la esquina', pl: 'róg ulicy' }] },
      { type: 'mc', prompt: 'Co znaczy „cerca"?', q: 'cerca', options: ['blisko', 'daleko', 'prosto', 'w lewo'], answer: 'blisko', word: 'u5-cerca', say: 'El metro está cerca de aquí.' },
      { type: 'fill', q: 'Sigue ___ hasta la plaza.', options: ['todo recto', 'lejos', 'la cuenta', 'hoy'], answer: 'todo recto', word: 'u5-recto', say: 'Sigue todo recto hasta la plaza.' },
      { type: 'translate', dir: 'es-pl', q: 'La estación está lejos.', accept: ['dworzec jest daleko', 'stacja jest daleko'], answer: 'Dworzec jest daleko.', word: 'u5-lejos', say: 'La estación está lejos.' },
      { type: 'build', prompt: 'Ułóż pytanie: „Jak dojdę do placu?"', answer: ['¿Cómo', 'llego', 'a', 'la', 'plaza?'], say: '¿Cómo llego a la plaza?', word: 'u5-como-llego' },
      { type: 'speak', q: 'Gira a la derecha en la esquina.', word: 'u5-gira', say: 'Gira a la derecha en la esquina.' },
      { type: 'mc', prompt: 'Czym pojedziesz szybko przez centrum miasta?', q: 'Voy en … al centro.', options: ['metro', 'postre', 'calle', 'cuenta'], answer: 'metro', word: 'u5-metro', say: 'Voy en metro al centro.' },
      { type: 'translate', dir: 'pl-es', q: 'Bank jest w lewo.', accept: ['el banco está a la izquierda', 'el banco esta a la izquierda', 'banco a la izquierda'], answer: 'El banco está a la izquierda.', word: 'u5-izquierda' },
      { type: 'fill', q: 'La plaza mayor está en el ___.', options: ['centro', 'postre', 'lunes', 'agua'], answer: 'centro', word: 'u5-plaza', say: 'La plaza mayor está en el centro.' },
      { type: 'mc', prompt: 'Gdzie mieszkasz? Wskaż słowo „ulica".', q: 'Vivo en esta …', options: ['calle', 'estación', 'cuenta', 'hora'], answer: 'calle', word: 'u5-calle', say: 'Vivo en esta calle.' }
    ]
  }],
  6: [{
    id: 'u6l2', unit: 6, title: 'La hora y los días', subtitle: 'Godziny i dni tygodnia',
    exercises: [
      { type: 'match', pairs: [{ es: 'el lunes', pl: 'poniedziałek' }, { es: 'el martes', pl: 'wtorek' }, { es: 'el miércoles', pl: 'środa' }, { es: 'el fin de semana', pl: 'weekend' }] },
      { type: 'mc', prompt: 'Jak zapytasz, która jest godzina?', q: '¿…?', options: ['¿Qué hora es?', '¿Cómo llego?', '¿Cuánto es?', '¿Dónde está?'], answer: '¿Qué hora es?', word: 'u6-hora', say: '¿Qué hora es, por favor?' },
      { type: 'fill', q: '___ las tres de la tarde.', options: ['Son', 'Es', 'Hoy', 'Gira'], answer: 'Son', word: 'u6-son-las', say: 'Son las tres de la tarde.' },
      { type: 'translate', dir: 'es-pl', q: 'Es la una en punto.', accept: ['jest pierwsza równo', 'jest pierwsza rowno', 'jest pierwsza', 'jest godzina pierwsza'], answer: 'Jest pierwsza równo.', word: 'u6-la-una', say: 'Es la una en punto.' },
      { type: 'build', prompt: 'Ułóż zdanie: „Jest wpół do trzeciej." (dosł. druga i pół)', answer: ['Son', 'las', 'dos', 'y', 'media.'], say: 'Son las dos y media.', word: 'u6-y-media' },
      { type: 'speak', q: 'Son las cuatro y cuarto.', word: 'u6-y-cuarto', say: 'Son las cuatro y cuarto.' },
      { type: 'mc', prompt: 'Co znaczy „el fin de semana"?', q: 'el fin de semana', options: ['weekend', 'poniedziałek', 'środa', 'godzina'], answer: 'weekend', word: 'u6-fin-de-semana', say: 'El fin de semana descanso.' },
      { type: 'translate', dir: 'pl-es', q: 'Dzisiaj jest poniedziałek.', accept: ['hoy es lunes', 'hoy es el lunes'], answer: 'Hoy es lunes.', word: 'u6-hoy' },
      { type: 'fill', q: 'Mañana es ___.', options: ['martes', 'cuenta', 'recto', 'agua'], answer: 'martes', word: 'u6-martes', say: 'Mañana es martes.' },
      { type: 'mc', prompt: 'Co znaczy „en punto"?', q: 'Son las cinco en punto.', options: ['równo (o pełnej godzinie)', 'wpół do', 'kwadrans po', 'daleko'], answer: 'równo (o pełnej godzinie)', word: 'u6-en-punto', say: 'Son las cinco en punto.' }
    ]
  }],
  7: [{
    id: 'u7l2', unit: 7, title: 'Kolory i ubrania', subtitle: 'Rojo, azul, la camiseta i przymierzanie',
    exercises: [
      { type: 'match', pairs: [{ es: 'rojo', pl: 'czerwony' }, { es: 'azul', pl: 'niebieski' }, { es: 'verde', pl: 'zielony' }, { es: 'negro', pl: 'czarny' }] },
      { type: 'mc', prompt: 'Wybierz poprawny kolor po hiszpańsku', q: 'żółty', options: ['amarillo', 'blanco', 'negro', 'verde'], answer: 'amarillo', word: 'u7-amarillo', say: 'amarillo' },
      { type: 'translate', dir: 'es-pl', q: 'La camiseta es azul.', accept: ['koszulka jest niebieska', 'koszulka jest niebieski'], answer: 'Koszulka jest niebieska.', word: 'u7-camiseta', say: 'La camiseta es azul.' },
      { type: 'fill', q: 'Los pantalones son ___ (czarne).', options: ['negros', 'negro', 'roja', 'verde'], answer: 'negros', word: 'u7-pantalones', say: 'Los pantalones son negros.' },
      { type: 'translate', dir: 'pl-es', q: 'Chcę przymierzyć tę koszulkę.', accept: ['quiero probar esta camiseta'], answer: 'Quiero probar esta camiseta.', word: 'u7-quiero-probar' },
      { type: 'mc', prompt: 'Jak zapytać o rozmiar?', q: '¿Qué ___ tienes?', options: ['talla', 'color', 'precio', 'tienda'], answer: 'talla', word: 'u7-talla', say: '¿Qué talla tienes?' },
      { type: 'build', prompt: 'Ułóż zdanie: Sukienka jest czerwona.', answer: ['El', 'vestido', 'es', 'rojo'], say: 'El vestido es rojo.', word: 'u7-vestido' },
      { type: 'translate', dir: 'es-pl', q: '¿Cuánto cuesta?', accept: ['ile kosztuje', 'ile to kosztuje'], answer: 'Ile kosztuje?', word: 'u7-cuanto-cuesta', say: '¿Cuánto cuesta?' },
      { type: 'speak', q: 'Quiero probar los zapatos.', word: 'u7-zapatos', say: 'Quiero probar los zapatos.' },
      { type: 'mc', prompt: "Co znaczy 'me lo llevo'?", q: 'me lo llevo', options: ['biorę to', 'oddaję to', 'szukam tego', 'nie lubię tego'], answer: 'biorę to', word: 'u7-me-lo-llevo', say: 'Me lo llevo.' }
    ]
  }],
  8: [{
    id: 'u8l2', unit: 8, title: 'Czas wolny', subtitle: 'Gustar, hobby i ¿qué te gusta?',
    exercises: [
      { type: 'match', pairs: [{ es: 'jugar', pl: 'grać' }, { es: 'bailar', pl: 'tańczyć' }, { es: 'leer', pl: 'czytać' }, { es: 'cantar', pl: 'śpiewać' }] },
      { type: 'mc', prompt: 'Uzupełnij: ___ los libros (lubię książki).', q: '___ los libros', options: ['Me gustan', 'Me gusta', 'Te gustan', 'Gusto'], answer: 'Me gustan', word: 'u8-me-gustan', say: 'Me gustan los libros.' },
      { type: 'translate', dir: 'es-pl', q: 'Me gusta bailar.', accept: ['lubię tańczyć', 'lubie tanczyc', 'lubię tanczyć'], answer: 'Lubię tańczyć.', word: 'u8-bailar', say: 'Me gusta bailar.' },
      { type: 'fill', q: 'Vamos al ___ el sábado (idziemy do kina).', options: ['cine', 'fútbol', 'música', 'playa'], answer: 'cine', word: 'u8-cine', say: 'Vamos al cine el sábado.' },
      { type: 'translate', dir: 'pl-es', q: 'Co lubisz robić?', accept: ['¿qué te gusta hacer?', 'que te gusta hacer', 'qué te gusta hacer'], answer: '¿Qué te gusta hacer?', word: 'u8-que-te-gusta' },
      { type: 'build', prompt: 'Ułóż zdanie: Lubię czytać powieści.', answer: ['Me', 'gusta', 'leer', 'novelas'], say: 'Me gusta leer novelas.', word: 'u8-leer' },
      { type: 'mc', prompt: "Co znaczy 'no me gusta'?", q: 'no me gusta', options: ['nie lubię', 'bardzo lubię', 'też lubię', 'lubię (l. mnoga)'], answer: 'nie lubię', word: 'u8-no-me-gusta', say: 'No me gusta.' },
      { type: 'speak', q: 'Me gusta jugar al fútbol.', word: 'u8-jugar', say: 'Me gusta jugar al fútbol.' },
      { type: 'translate', dir: 'es-pl', q: 'Me gusta la música.', accept: ['lubię muzykę', 'lubie muzyke', 'lubię muzyke'], answer: 'Lubię muzykę.', word: 'u8-musica', say: 'Me gusta la música.' },
      { type: 'fill', q: 'A mí ___ me gusta bailar (mnie też).', options: ['también', 'cine', 'nadar', 'canta'], answer: 'también', word: 'u8-tambien', say: 'A mí también me gusta bailar.' }
    ]
  }],
  9: [{
    id: 'u9l2', unit: 9, title: 'Plany', subtitle: 'Quiero, tengo que i pogoda na weekend',
    exercises: [
      { type: 'match', pairs: [{ es: 'quiero', pl: 'chcę' }, { es: 'necesito', pl: 'potrzebuję' }, { es: 'hace sol', pl: 'jest słonecznie' }, { es: 'hace frío', pl: 'jest zimno' }] },
      { type: 'mc', prompt: 'Uzupełnij: ___ estudiar hoy (muszę się dziś uczyć).', q: '___ estudiar hoy', options: ['Tengo que', 'Quiero probar', 'Hace sol', 'Necesito que'], answer: 'Tengo que', word: 'u9-tengo-que', say: 'Tengo que estudiar hoy.' },
      { type: 'translate', dir: 'es-pl', q: 'Hoy hace frío.', accept: ['dziś jest zimno', 'dzis jest zimno', 'dzisiaj jest zimno'], answer: 'Dziś jest zimno.', word: 'u9-hace-frio', say: 'Hoy hace frío.' },
      { type: 'fill', q: 'El finde quiero ir a la ___ (plaża).', options: ['playa', 'cine', 'talla', 'música'], answer: 'playa', word: 'u9-playa', say: 'El finde quiero ir a la playa.' },
      { type: 'translate', dir: 'pl-es', q: 'Potrzebuję kurtki.', accept: ['necesito un abrigo', 'necesito una chaqueta'], answer: 'Necesito un abrigo.', word: 'u9-necesito' },
      { type: 'build', prompt: 'Ułóż zdanie: Chcę odpocząć.', answer: ['Quiero', 'descansar'], say: 'Quiero descansar.', word: 'u9-descansar' },
      { type: 'mc', prompt: "Co znaczy 'llueve'?", q: 'llueve', options: ['pada deszcz', 'jest gorąco', 'jest słonecznie', 'jutro'], answer: 'pada deszcz', word: 'u9-llueve', say: 'Llueve.' },
      { type: 'speak', q: 'El finde tengo que trabajar.', word: 'u9-finde', say: 'El finde tengo que trabajar.' },
      { type: 'translate', dir: 'es-pl', q: 'En agosto hace calor.', accept: ['w sierpniu jest gorąco', 'w sierpniu jest goraco'], answer: 'W sierpniu jest gorąco.', word: 'u9-hace-calor', say: 'En agosto hace calor.' },
      { type: 'fill', q: '___ tengo que trabajar (jutro).', options: ['Mañana', 'Ayer', 'Playa', 'Finde'], answer: 'Mañana', word: 'u9-manana', say: 'Mañana tengo que trabajar.' }
    ]
  }],
  10: [{
    id: 'u10l2', unit: 10, title: 'Przeszłość', subtitle: 'Fui, comí, vi i ¿qué hiciste?',
    exercises: [
      { type: 'match', pairs: [{ es: 'fui', pl: 'poszedłem' }, { es: 'comí', pl: 'zjadłem' }, { es: 'vi', pl: 'zobaczyłem' }, { es: 'ayer', pl: 'wczoraj' }] },
      { type: 'mc', prompt: 'Uzupełnij: Ayer ___ al cine (poszedłem).', q: 'Ayer ___ al cine', options: ['fui', 'comí', 'vi', 'tengo'], answer: 'fui', word: 'u10-fui', say: 'Ayer fui al cine.' },
      { type: 'translate', dir: 'es-pl', q: 'Comí una pizza.', accept: ['zjadłem pizzę', 'zjadlem pizze', 'zjadłam pizzę'], answer: 'Zjadłem pizzę.', word: 'u10-comi', say: 'Comí una pizza.' },
      { type: 'fill', q: '___ una película muy buena (widziałem).', options: ['Vi', 'Fui', 'Comí', 'Bebí'], answer: 'Vi', word: 'u10-vi', say: 'Vi una película muy buena.' },
      { type: 'translate', dir: 'pl-es', q: 'Co robiłeś w sobotę?', accept: ['¿qué hiciste el sábado?', 'que hiciste el sabado', 'qué hiciste el sábado'], answer: '¿Qué hiciste el sábado?', word: 'u10-que-hiciste' },
      { type: 'build', prompt: 'Ułóż zdanie: W zeszły weekend poszedłem do Madrytu.', answer: ['El', 'fin', 'de', 'semana', 'pasado', 'fui', 'a', 'Madrid'], say: 'El fin de semana pasado fui a Madrid.', word: 'u10-fin-de-semana-pasado' },
      { type: 'mc', prompt: "Co znaczy 'me gustó'?", q: 'me gustó', options: ['podobało mi się', 'lubię', 'chcę', 'zjadłem'], answer: 'podobało mi się', word: 'u10-me-gusto', say: 'Me gustó.' },
      { type: 'speak', q: 'El fin de semana pasado jugué al fútbol.', word: 'u10-jugue', say: 'El fin de semana pasado jugué al fútbol.' },
      { type: 'translate', dir: 'es-pl', q: 'Ayer estuve en casa.', accept: ['wczoraj byłem w domu', 'wczoraj bylem w domu', 'wczoraj byłam w domu'], answer: 'Wczoraj byłem w domu.', word: 'u10-estuve', say: 'Ayer estuve en casa.' },
      { type: 'fill', q: 'En el parque ___ agua (wypiłem).', options: ['bebí', 'comí', 'fui', 'vi'], answer: 'bebí', word: 'u10-bebi', say: 'En el parque bebí agua.' }
    ]
  }]
};
