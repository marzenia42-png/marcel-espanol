/* lessons.js — ścieżka 10 jednostek.
   Jednostki 1–3: pełne (4 lekcje × 10–12 ćwiczeń).
   Jednostki 4–10: struktura + lekcja startowa (dobudowa falami).
   Typy ćwiczeń: mc | translate | fill | build | match | speak.
   Pole `word` spina ćwiczenie ze słownikiem i systemem powtórek (SRS).        */

export const UNITS = [
  /* ===================== JEDNOSTKA 1: POWITANIA ===================== */
  {
    id: 1, title: 'Powitania', subtitle: 'Przywitaj się i przedstaw', icon: '👋',
    lessons: [
      {
        id: 'u1l1', title: 'Hola y adiós', subtitle: 'Cześć i do widzenia',
        exercises: [
          { type: 'mc', q: 'hola', prompt: 'Co to znaczy?', say: 'hola', options: ['cześć', 'dziękuję', 'do widzenia', 'tak'], answer: 'cześć', word: 'hola' },
          { type: 'mc', prompt: 'Jak powiesz „do widzenia"?', q: 'do widzenia', options: ['adiós', 'hola', 'gracias', 'sí'], answer: 'adiós', word: 'adios' },
          { type: 'match', pairs: [{ es: 'hola', pl: 'cześć' }, { es: 'adiós', pl: 'do widzenia' }, { es: 'gracias', pl: 'dziękuję' }, { es: 'sí', pl: 'tak' }] },
          { type: 'translate', dir: 'es-pl', q: 'Buenos días', say: 'Buenos días', accept: ['dzień dobry'], answer: 'dzień dobry', word: 'buenos-dias' },
          { type: 'fill', q: '¡___! ¿Qué tal?', say: '¡Hola! ¿Qué tal?', options: ['Hola', 'Adiós'], answer: 'Hola', word: 'hola' },
          { type: 'mc', q: 'buenas noches', prompt: 'Co to znaczy?', say: 'buenas noches', options: ['dobry wieczór / dobranoc', 'dzień dobry', 'cześć', 'dziękuję'], answer: 'dobry wieczór / dobranoc', word: 'buenas-noches' },
          { type: 'build', prompt: 'Przywitaj się rano:', answer: ['Buenos', 'días'], say: 'Buenos días', word: 'buenos-dias' },
          { type: 'translate', dir: 'pl-es', q: 'Cześć', accept: ['hola'], answer: 'hola', word: 'hola' },
          { type: 'mc', prompt: 'Wychodzisz — co mówisz?', q: 'Wychodzisz z pokoju:', options: ['adiós', 'hola', 'sí', 'gracias'], answer: 'adiós', word: 'adios' },
          { type: 'speak', q: 'Hola, buenos días', word: 'buenos-dias' },
          { type: 'match', pairs: [{ es: 'buenos días', pl: 'dzień dobry' }, { es: 'buenas noches', pl: 'dobranoc' }, { es: 'adiós', pl: 'do widzenia' }, { es: 'hola', pl: 'cześć' }] },
          { type: 'translate', dir: 'es-pl', q: 'Hasta luego', say: 'Hasta luego', accept: ['do zobaczenia', 'na razie'], answer: 'do zobaczenia', word: 'hasta-luego' }
        ]
      },
      {
        id: 'u1l2', title: '¿Cómo estás?', subtitle: 'Jak się masz?',
        exercises: [
          { type: 'mc', q: '¿Cómo estás?', prompt: 'Co znaczy to pytanie?', say: '¿Cómo estás?', options: ['Jak się masz?', 'Skąd jesteś?', 'Jak masz na imię?', 'Ile masz lat?'], answer: 'Jak się masz?', word: 'como-estas' },
          { type: 'mc', q: 'bien', prompt: 'Co to znaczy?', options: ['dobrze', 'źle', 'tak sobie', 'dziękuję'], answer: 'dobrze', word: 'bien' },
          { type: 'mc', q: 'mal', prompt: 'Co to znaczy?', options: ['źle', 'dobrze', 'cześć', 'proszę'], answer: 'źle', word: 'mal' },
          { type: 'fill', q: '— ¿Cómo estás? — Muy ___.', say: 'Muy bien', options: ['bien', 'adiós'], answer: 'bien', word: 'bien' },
          { type: 'translate', dir: 'es-pl', q: '¿Cómo estás?', say: '¿Cómo estás?', accept: ['jak się masz', 'jak sie masz'], answer: 'jak się masz?', word: 'como-estas' },
          { type: 'build', prompt: 'Odpowiedz: Mam się dobrze', answer: ['Estoy', 'bien'], say: 'Estoy bien' },
          { type: 'match', pairs: [{ es: 'bien', pl: 'dobrze' }, { es: 'mal', pl: 'źle' }, { es: 'regular', pl: 'tak sobie' }, { es: 'gracias', pl: 'dziękuję' }] },
          { type: 'mc', prompt: 'Czujesz się źle. Co mówisz?', q: '— ¿Cómo estás?', options: ['Estoy mal', 'Estoy bien', 'Hola', 'Adiós'], answer: 'Estoy mal', word: 'mal' },
          { type: 'translate', dir: 'pl-es', q: 'a ty?', accept: ['y tú', 'y tu'], answer: '¿y tú?', word: 'y-tu' },
          { type: 'speak', q: '¿Cómo estás?', word: 'como-estas' },
          { type: 'fill', q: 'Hola, ¿qué ___?', options: ['tal', 'mal'], answer: 'tal' },
          { type: 'mc', q: '¿Y tú?', prompt: 'Co to znaczy?', options: ['A ty?', 'I ty', 'Ty tam', 'Dziękuję'], answer: 'A ty?', word: 'y-tu' }
        ]
      },
      {
        id: 'u1l3', title: 'Gracias y por favor', subtitle: 'Grzeczność',
        exercises: [
          { type: 'mc', q: 'gracias', prompt: 'Co to znaczy?', options: ['dziękuję', 'proszę', 'przepraszam', 'nie'], answer: 'dziękuję', word: 'gracias' },
          { type: 'mc', q: 'por favor', prompt: 'Co to znaczy?', say: 'por favor', options: ['proszę (o coś)', 'nie ma za co', 'przepraszam', 'tak'], answer: 'proszę (o coś)', word: 'por-favor' },
          { type: 'mc', q: 'de nada', prompt: 'Co to znaczy?', say: 'de nada', options: ['nie ma za co', 'dziękuję', 'przepraszam', 'dobranoc'], answer: 'nie ma za co', word: 'de-nada' },
          { type: 'match', pairs: [{ es: 'gracias', pl: 'dziękuję' }, { es: 'de nada', pl: 'nie ma za co' }, { es: 'por favor', pl: 'proszę' }, { es: 'perdón', pl: 'przepraszam' }] },
          { type: 'fill', q: 'Un café, por ___.', say: 'Un café, por favor', options: ['favor', 'nada'], answer: 'favor', word: 'por-favor' },
          { type: 'translate', dir: 'es-pl', q: 'Muchas gracias', say: 'Muchas gracias', accept: ['dziękuję bardzo', 'wielkie dzięki', 'bardzo dziękuję'], answer: 'dziękuję bardzo', word: 'gracias' },
          { type: 'build', prompt: 'Powiedz: dziękuję bardzo', answer: ['Muchas', 'gracias'], say: 'Muchas gracias', word: 'gracias' },
          { type: 'mc', q: 'perdón', prompt: 'Co to znaczy?', say: 'perdón', options: ['przepraszam', 'dziękuję', 'proszę', 'cześć'], answer: 'przepraszam', word: 'perdon' },
          { type: 'translate', dir: 'pl-es', q: 'proszę (o coś)', accept: ['por favor'], answer: 'por favor', word: 'por-favor' },
          { type: 'speak', q: 'Muchas gracias', word: 'gracias' },
          { type: 'mc', prompt: 'Ktoś mówi „gracias". Odpowiadasz:', q: '— Gracias.', options: ['De nada', 'Por favor', 'Hola', 'Sí'], answer: 'De nada', word: 'de-nada' },
          { type: 'match', pairs: [{ es: 'muchas gracias', pl: 'dziękuję bardzo' }, { es: 'de nada', pl: 'nie ma za co' }, { es: 'perdón', pl: 'przepraszam' }, { es: 'por favor', pl: 'proszę' }] }
        ]
      },
      {
        id: 'u1l4', title: 'Me llamo…', subtitle: 'Przedstawianie się',
        exercises: [
          { type: 'mc', q: 'Me llamo Marcel', prompt: 'Co to znaczy?', say: 'Me llamo Marcel', options: ['Nazywam się Marcel', 'Lubię Marcela', 'To jest Marcel', 'Gdzie Marcel?'], answer: 'Nazywam się Marcel', word: 'me-llamo' },
          { type: 'fill', q: '___ llamo Ana.', options: ['Me', 'Tú'], answer: 'Me', word: 'me-llamo' },
          { type: 'build', prompt: 'Powiedz: Nazywam się Marcel', answer: ['Me', 'llamo', 'Marcel'], say: 'Me llamo Marcel', word: 'me-llamo' },
          { type: 'mc', q: 'mucho gusto', prompt: 'Co to znaczy?', say: 'mucho gusto', options: ['miło mi', 'do widzenia', 'dziękuję', 'dzień dobry'], answer: 'miło mi', word: 'mucho-gusto' },
          { type: 'translate', dir: 'es-pl', q: '¿Cómo te llamas?', say: '¿Cómo te llamas?', accept: ['jak masz na imię', 'jak się nazywasz', 'jak sie nazywasz'], answer: 'jak masz na imię?' },
          { type: 'match', pairs: [{ es: 'me llamo', pl: 'nazywam się' }, { es: 'mucho gusto', pl: 'miło mi' }, { es: 'encantado', pl: 'miło mi poznać' }, { es: 'hola', pl: 'cześć' }] },
          { type: 'mc', q: 'encantado', prompt: 'Co to znaczy?', say: 'encantado', options: ['miło mi poznać', 'jestem zmęczony', 'do zobaczenia', 'dziękuję'], answer: 'miło mi poznać', word: 'encantado' },
          { type: 'translate', dir: 'pl-es', q: 'Nazywam się Marcel', accept: ['me llamo marcel'], answer: 'me llamo Marcel', word: 'me-llamo' },
          { type: 'speak', q: 'Hola, me llamo Marcel', word: 'me-llamo' },
          { type: 'fill', q: 'Mucho ___.', options: ['gusto', 'bien'], answer: 'gusto', word: 'mucho-gusto' },
          { type: 'build', prompt: 'Zapytaj: jak masz na imię?', answer: ['¿Cómo', 'te', 'llamas?'], say: '¿Cómo te llamas?' },
          { type: 'mc', prompt: 'Ktoś się przedstawił. Odpowiadasz:', q: '— Hola, me llamo Ana.', options: ['Mucho gusto', 'Adiós', 'Gracias', 'No'], answer: 'Mucho gusto', word: 'mucho-gusto' }
        ]
      }
    ]
  },

  /* ===================== JEDNOSTKA 2: JA I TY ===================== */
  {
    id: 2, title: 'Ja i ty', subtitle: 'ser, zaimki, skąd jesteś', icon: '🧑',
    lessons: [
      {
        id: 'u2l1', title: 'Yo soy, tú eres', subtitle: 'Ja jestem, ty jesteś',
        exercises: [
          { type: 'mc', q: 'yo', prompt: 'Co to znaczy?', options: ['ja', 'ty', 'on', 'ona'], answer: 'ja', word: 'yo' },
          { type: 'mc', q: 'tú', prompt: 'Co to znaczy?', options: ['ty', 'ja', 'my', 'on'], answer: 'ty', word: 'tu' },
          { type: 'mc', q: 'Yo soy', prompt: 'Co to znaczy?', options: ['Ja jestem', 'Ty jesteś', 'On jest', 'Ja mam'], answer: 'Ja jestem', word: 'soy' },
          { type: 'fill', q: 'Yo ___ estudiante.', say: 'Yo soy estudiante', options: ['soy', 'eres'], answer: 'soy', word: 'soy' },
          { type: 'fill', q: 'Tú ___ de Polonia.', say: 'Tú eres de Polonia', options: ['eres', 'soy'], answer: 'eres', word: 'eres' },
          { type: 'match', pairs: [{ es: 'yo', pl: 'ja' }, { es: 'tú', pl: 'ty' }, { es: 'él', pl: 'on' }, { es: 'ella', pl: 'ona' }] },
          { type: 'build', prompt: 'Powiedz: Ja jestem uczniem', answer: ['Yo', 'soy', 'estudiante'], say: 'Yo soy estudiante', word: 'soy' },
          { type: 'translate', dir: 'es-pl', q: 'Ella es mi amiga', say: 'Ella es mi amiga', accept: ['ona jest moją przyjaciółką', 'ona jest moją koleżanką', 'to moja przyjaciółka'], answer: 'ona jest moją przyjaciółką' },
          { type: 'mc', q: 'él es', prompt: 'Co to znaczy?', options: ['on jest', 'ona jest', 'ty jesteś', 'ja jestem'], answer: 'on jest', word: 'es' },
          { type: 'speak', q: 'Yo soy de Polonia', word: 'soy' },
          { type: 'fill', q: 'Ella ___ profesora.', options: ['es', 'eres'], answer: 'es', word: 'es' },
          { type: 'translate', dir: 'pl-es', q: 'Ty jesteś', accept: ['tú eres', 'tu eres'], answer: 'tú eres', word: 'eres' }
        ]
      },
      {
        id: 'u2l2', title: '¿De dónde eres?', subtitle: 'Skąd jesteś?',
        exercises: [
          { type: 'mc', q: '¿De dónde eres?', prompt: 'Co to znaczy?', say: '¿De dónde eres?', options: ['Skąd jesteś?', 'Jak się masz?', 'Ile masz lat?', 'Kim jesteś?'], answer: 'Skąd jesteś?', word: 'de-donde-eres' },
          { type: 'mc', q: 'Soy de Polonia', prompt: 'Co to znaczy?', say: 'Soy de Polonia', options: ['Jestem z Polski', 'Idę do Polski', 'Lubię Polskę', 'Mieszkam sam'], answer: 'Jestem z Polski', word: 'soy-de' },
          { type: 'fill', q: '___ de Cracovia.', options: ['Soy', 'Eres'], answer: 'Soy', word: 'soy-de' },
          { type: 'match', pairs: [{ es: 'Polonia', pl: 'Polska' }, { es: 'España', pl: 'Hiszpania' }, { es: 'soy de', pl: 'jestem z' }, { es: '¿de dónde eres?', pl: 'skąd jesteś?' }] },
          { type: 'build', prompt: 'Zapytaj: Skąd jesteś?', answer: ['¿De', 'dónde', 'eres?'], say: '¿De dónde eres?', word: 'de-donde-eres' },
          { type: 'translate', dir: 'es-pl', q: 'Soy de España', say: 'Soy de España', accept: ['jestem z hiszpanii'], answer: 'jestem z Hiszpanii', word: 'soy-de' },
          { type: 'mc', q: 'España', prompt: 'Co to za kraj?', options: ['Hiszpania', 'Polska', 'Włochy', 'Francja'], answer: 'Hiszpania', word: 'espana' },
          { type: 'speak', q: 'Soy de Polonia', word: 'soy-de' },
          { type: 'fill', q: '— ¿De dónde eres? — ___ de Polonia.', options: ['Soy', 'Es'], answer: 'Soy', word: 'soy-de' },
          { type: 'translate', dir: 'pl-es', q: 'Jestem z Polski', accept: ['soy de polonia'], answer: 'soy de Polonia', word: 'soy-de' },
          { type: 'mc', prompt: 'Ktoś pyta „¿De dónde eres?". Odpowiadasz:', q: '— ¿De dónde eres?', options: ['Soy de Polonia', 'Me llamo Marcel', 'Muy bien', 'Gracias'], answer: 'Soy de Polonia', word: 'soy-de' },
          { type: 'match', pairs: [{ es: 'yo soy', pl: 'ja jestem' }, { es: 'tú eres', pl: 'ty jesteś' }, { es: 'soy de', pl: 'jestem z' }, { es: 'y tú', pl: 'a ty' }] }
        ]
      },
      {
        id: 'u2l3', title: 'Nacionalidades', subtitle: 'Narodowości',
        exercises: [
          { type: 'mc', q: 'polaco', prompt: 'Co to znaczy?', options: ['Polak / polski', 'Hiszpan', 'Polska', 'uczeń'], answer: 'Polak / polski', word: 'polaco' },
          { type: 'mc', q: 'español', prompt: 'Co to znaczy?', say: 'español', options: ['Hiszpan / hiszpański', 'Polak', 'Hiszpania', 'przyjaciel'], answer: 'Hiszpan / hiszpański', word: 'espanol' },
          { type: 'fill', q: 'Yo soy ___. (Marcel z Polski)', options: ['polaco', 'español'], answer: 'polaco', word: 'polaco' },
          { type: 'fill', q: 'Él es ___. (chłopak z Madrytu)', options: ['español', 'polaco'], answer: 'español', word: 'espanol' },
          { type: 'match', pairs: [{ es: 'polaco', pl: 'Polak' }, { es: 'español', pl: 'Hiszpan' }, { es: 'Polonia', pl: 'Polska' }, { es: 'España', pl: 'Hiszpania' }] },
          { type: 'translate', dir: 'es-pl', q: 'Yo soy polaco', say: 'Yo soy polaco', accept: ['jestem polakiem', 'ja jestem polakiem'], answer: 'jestem Polakiem', word: 'polaco' },
          { type: 'build', prompt: 'Powiedz: On jest Hiszpanem', answer: ['Él', 'es', 'español'], say: 'Él es español', word: 'espanol' },
          { type: 'mc', q: 'estudiante', prompt: 'Co to znaczy?', options: ['uczeń / student', 'nauczyciel', 'przyjaciel', 'brat'], answer: 'uczeń / student', word: 'estudiante' },
          { type: 'speak', q: 'Yo soy polaco', word: 'polaco' },
          { type: 'translate', dir: 'pl-es', q: 'Ja też', accept: ['yo también', 'yo tambien'], answer: 'yo también', word: 'tambien' },
          { type: 'mc', q: 'también', prompt: 'Co to znaczy?', say: 'también', options: ['też', 'nie', 'ale', 'i'], answer: 'też', word: 'tambien' },
          { type: 'fill', q: 'Yo ___ soy de Polonia. (ja też)', options: ['también', 'no'], answer: 'también', word: 'tambien' }
        ]
      },
      {
        id: 'u2l4', title: 'Presentaciones', subtitle: 'Cała rozmowa',
        exercises: [
          { type: 'mc', prompt: 'Ktoś pyta „¿Cómo estás?". Odpowiadasz:', q: '— ¿Cómo estás?', options: ['Muy bien, gracias', 'De dónde', 'Español', 'Adiós'], answer: 'Muy bien, gracias' },
          { type: 'build', prompt: 'Przywitaj się i przedstaw', answer: ['Hola,', 'me', 'llamo', 'Marcel'], say: 'Hola, me llamo Marcel', word: 'me-llamo' },
          { type: 'match', pairs: [{ es: '¿cómo estás?', pl: 'jak się masz?' }, { es: '¿de dónde eres?', pl: 'skąd jesteś?' }, { es: '¿cómo te llamas?', pl: 'jak masz na imię?' }, { es: 'mucho gusto', pl: 'miło mi' }] },
          { type: 'mc', q: 'encantado', prompt: 'Co to znaczy?', options: ['miło mi poznać', 'jestem zmęczony', 'dziękuję', 'do widzenia'], answer: 'miło mi poznać', word: 'encantado' },
          { type: 'translate', dir: 'es-pl', q: 'Encantado, ¿y tú?', say: 'Encantado, ¿y tú?', accept: ['miło mi a ty', 'miło mi poznać a ty', 'miło mi, a ty?'], answer: 'miło mi, a ty?' },
          { type: 'fill', q: 'Mucho ___.', options: ['gusto', 'bien'], answer: 'gusto', word: 'mucho-gusto' },
          { type: 'speak', q: 'Hola, me llamo Marcel. Mucho gusto.', word: 'mucho-gusto' },
          { type: 'build', prompt: 'Zapytaj skąd ktoś jest', answer: ['¿De', 'dónde', 'eres?'], word: 'de-donde-eres' },
          { type: 'mc', q: 'y tú', prompt: 'Co to znaczy?', options: ['a ty?', 'i ty', 'ty tam', 'dziękuję'], answer: 'a ty?', word: 'y-tu' },
          { type: 'translate', dir: 'pl-es', q: 'Miło mi', accept: ['mucho gusto', 'encantado'], answer: 'mucho gusto', word: 'mucho-gusto' },
          { type: 'match', pairs: [{ es: 'soy de', pl: 'jestem z' }, { es: 'me llamo', pl: 'nazywam się' }, { es: 'también', pl: 'też' }, { es: 'encantado', pl: 'miło mi' }] },
          { type: 'speak', q: '¿De dónde eres?', word: 'de-donde-eres' }
        ]
      }
    ]
  },

  /* ===================== JEDNOSTKA 3: RODZINA I LICZBY ===================== */
  {
    id: 3, title: 'Rodzina i liczby', subtitle: 'Bliscy i liczenie 0–20', icon: '👨‍👩‍👦',
    lessons: [
      {
        id: 'u3l1', title: 'La familia', subtitle: 'Rodzina',
        exercises: [
          { type: 'mc', q: 'la familia', prompt: 'Co to znaczy?', say: 'la familia', options: ['rodzina', 'przyjaciel', 'dom', 'miasto'], answer: 'rodzina', word: 'familia' },
          { type: 'mc', q: 'la madre', prompt: 'Co to znaczy?', say: 'la madre', options: ['matka', 'ojciec', 'siostra', 'córka'], answer: 'matka', word: 'madre' },
          { type: 'mc', q: 'el padre', prompt: 'Co to znaczy?', say: 'el padre', options: ['ojciec', 'matka', 'brat', 'syn'], answer: 'ojciec', word: 'padre' },
          { type: 'match', pairs: [{ es: 'madre', pl: 'matka' }, { es: 'padre', pl: 'ojciec' }, { es: 'hermano', pl: 'brat' }, { es: 'hermana', pl: 'siostra' }] },
          { type: 'fill', q: 'Mi ___ se llama Beata.', options: ['madre', 'padre'], answer: 'madre', word: 'madre' },
          { type: 'mc', q: 'el hermano', prompt: 'Co to znaczy?', options: ['brat', 'siostra', 'syn', 'ojciec'], answer: 'brat', word: 'hermano' },
          { type: 'mc', q: 'la hermana', prompt: 'Co to znaczy?', options: ['siostra', 'brat', 'córka', 'matka'], answer: 'siostra', word: 'hermana' },
          { type: 'translate', dir: 'es-pl', q: 'Mi familia es grande', say: 'Mi familia es grande', accept: ['moja rodzina jest duża'], answer: 'moja rodzina jest duża', word: 'familia' },
          { type: 'build', prompt: 'Powiedz: To jest mój brat', answer: ['Es', 'mi', 'hermano'], say: 'Es mi hermano', word: 'hermano' },
          { type: 'speak', q: 'Mi familia es grande', word: 'familia' },
          { type: 'match', pairs: [{ es: 'hijo', pl: 'syn' }, { es: 'hija', pl: 'córka' }, { es: 'madre', pl: 'matka' }, { es: 'padre', pl: 'ojciec' }] },
          { type: 'translate', dir: 'pl-es', q: 'mój brat', accept: ['mi hermano'], answer: 'mi hermano', word: 'hermano' }
        ]
      },
      {
        id: 'u3l2', title: 'Números 0–10', subtitle: 'Liczby 0–10',
        exercises: [
          { type: 'match', pairs: [{ es: 'uno', pl: '1' }, { es: 'dos', pl: '2' }, { es: 'tres', pl: '3' }, { es: 'cuatro', pl: '4' }] },
          { type: 'match', pairs: [{ es: 'cinco', pl: '5' }, { es: 'seis', pl: '6' }, { es: 'siete', pl: '7' }, { es: 'ocho', pl: '8' }] },
          { type: 'mc', q: 'diez', prompt: 'Jaka liczba?', say: 'diez', options: ['10', '2', '6', '12'], answer: '10', word: 'diez' },
          { type: 'fill', q: 'uno, dos, ___', options: ['tres', 'cinco'], answer: 'tres', word: 'tres' },
          { type: 'mc', q: 'siete', prompt: 'Jaka liczba?', options: ['7', '6', '8', '9'], answer: '7', word: 'siete' },
          { type: 'translate', dir: 'es-pl', q: 'cinco', accept: ['5', 'pięć', 'piec'], answer: '5 (pięć)', word: 'cinco' },
          { type: 'build', prompt: 'Policz do trzech', answer: ['uno', 'dos', 'tres'], word: 'uno' },
          { type: 'mc', q: 'cuatro', prompt: 'Jaka liczba?', options: ['4', '5', '6', '1'], answer: '4', word: 'cuatro' },
          { type: 'speak', q: 'uno, dos, tres, cuatro, cinco', word: 'cinco' },
          { type: 'match', pairs: [{ es: 'seis', pl: '6' }, { es: 'ocho', pl: '8' }, { es: 'nueve', pl: '9' }, { es: 'diez', pl: '10' }] },
          { type: 'fill', q: 'ocho, nueve, ___', options: ['diez', 'seis'], answer: 'diez', word: 'diez' },
          { type: 'translate', dir: 'pl-es', q: 'siedem', accept: ['siete'], answer: 'siete', word: 'siete' }
        ]
      },
      {
        id: 'u3l3', title: 'Números 11–20', subtitle: 'Liczby 11–20',
        exercises: [
          { type: 'match', pairs: [{ es: 'once', pl: '11' }, { es: 'doce', pl: '12' }, { es: 'trece', pl: '13' }, { es: 'catorce', pl: '14' }] },
          { type: 'mc', q: 'quince', prompt: 'Jaka liczba?', say: 'quince', options: ['15', '5', '50', '13'], answer: '15', word: 'quince' },
          { type: 'mc', q: 'veinte', prompt: 'Jaka liczba?', say: 'veinte', options: ['20', '12', '10', '15'], answer: '20', word: 'veinte' },
          { type: 'fill', q: 'once, doce, ___', options: ['trece', 'veinte'], answer: 'trece', word: 'trece' },
          { type: 'translate', dir: 'es-pl', q: 'veinte', accept: ['20', 'dwadzieścia', 'dwadziescia'], answer: '20 (dwadzieścia)', word: 'veinte' },
          { type: 'match', pairs: [{ es: 'trece', pl: '13' }, { es: 'catorce', pl: '14' }, { es: 'quince', pl: '15' }, { es: 'veinte', pl: '20' }] },
          { type: 'mc', q: 'doce', prompt: 'Jaka liczba?', options: ['12', '2', '10', '20'], answer: '12', word: 'doce' },
          { type: 'build', prompt: 'Policz: 11, 12, 13', answer: ['once', 'doce', 'trece'], word: 'once' },
          { type: 'speak', q: 'once, doce, trece', word: 'doce' },
          { type: 'fill', q: 'catorce, ___, dieciséis', options: ['quince', 'veinte'], answer: 'quince', word: 'quince' },
          { type: 'mc', q: 'trece', prompt: 'Jaka liczba?', options: ['13', '3', '30', '14'], answer: '13', word: 'trece' },
          { type: 'translate', dir: 'pl-es', q: 'dwadzieścia', accept: ['veinte'], answer: 'veinte', word: 'veinte' }
        ]
      },
      {
        id: 'u3l4', title: '¿Cuántos años tienes?', subtitle: 'Ile masz lat?',
        exercises: [
          { type: 'mc', q: '¿Cuántos años tienes?', prompt: 'Co to znaczy?', say: '¿Cuántos años tienes?', options: ['Ile masz lat?', 'Która godzina?', 'Jak się masz?', 'Ile to kosztuje?'], answer: 'Ile masz lat?', word: 'cuantos-anos' },
          { type: 'mc', q: 'tengo', prompt: 'Co to znaczy?', options: ['(ja) mam', '(ty) masz', '(on) ma', '(ja) jestem'], answer: '(ja) mam', word: 'tengo' },
          { type: 'fill', q: '___ dieciocho años.', say: 'Tengo dieciocho años', options: ['Tengo', 'Tienes'], answer: 'Tengo', word: 'tengo' },
          { type: 'build', prompt: 'Powiedz: Mam 18 lat', answer: ['Tengo', 'dieciocho', 'años'], say: 'Tengo dieciocho años', word: 'anos' },
          { type: 'translate', dir: 'es-pl', q: '¿Cuántos años tienes?', say: '¿Cuántos años tienes?', accept: ['ile masz lat', 'ile masz lat?'], answer: 'ile masz lat?', word: 'cuantos-anos' },
          { type: 'mc', q: 'años', prompt: 'Co to znaczy?', options: ['lata (wiek)', 'dni', 'godziny', 'miesiące'], answer: 'lata (wiek)', word: 'anos' },
          { type: 'match', pairs: [{ es: 'tengo', pl: 'ja mam' }, { es: 'tienes', pl: 'ty masz' }, { es: 'tiene', pl: 'on ma' }, { es: 'años', pl: 'lata' }] },
          { type: 'fill', q: '¿Cuántos años ___?', options: ['tienes', 'tengo'], answer: 'tienes', word: 'tienes' },
          { type: 'speak', q: 'Tengo dieciocho años', word: 'anos' },
          { type: 'translate', dir: 'pl-es', q: 'Mam dwadzieścia lat', accept: ['tengo veinte años', 'tengo veinte anos'], answer: 'tengo veinte años', word: 'tengo' },
          { type: 'mc', prompt: 'Ktoś pyta „¿Cuántos años tienes?". Odpowiadasz:', q: '— ¿Cuántos años tienes?', options: ['Tengo dieciocho años', 'Soy de Polonia', 'Me llamo Marcel', 'Muy bien'], answer: 'Tengo dieciocho años', word: 'tengo' },
          { type: 'build', prompt: 'Zapytaj: Ile masz lat?', answer: ['¿Cuántos', 'años', 'tienes?'], word: 'cuantos-anos' }
        ]
      }
    ]
  },

  /* ============= JEDNOSTKI 4–10: struktura + lekcja startowa ============= */
  {
    id: 4, title: 'Jedzenie i picie', subtitle: 'W barze i restauracji', icon: '🍽️',
    lessons: [
      {
        id: 'u4l1', title: 'En el bar', subtitle: 'Zamawianie',
        exercises: [
          { type: 'mc', q: 'el café', prompt: 'Co to znaczy?', say: 'el café', options: ['kawa', 'herbata', 'woda', 'chleb'], answer: 'kawa', word: 'cafe' },
          { type: 'mc', q: 'el agua', prompt: 'Co to znaczy?', say: 'el agua', options: ['woda', 'kawa', 'wino', 'mleko'], answer: 'woda', word: 'agua' },
          { type: 'fill', q: '___ un café, por favor.', say: 'Quiero un café', options: ['Quiero', 'Tengo'], answer: 'Quiero', word: 'quiero' },
          { type: 'build', prompt: 'Poproś o kawę', answer: ['Un', 'café,', 'por', 'favor'], say: 'Un café, por favor', word: 'cafe' },
          { type: 'match', pairs: [{ es: 'agua', pl: 'woda' }, { es: 'café', pl: 'kawa' }, { es: 'pan', pl: 'chleb' }, { es: 'la cuenta', pl: 'rachunek' }] },
          { type: 'translate', dir: 'es-pl', q: 'La cuenta, por favor', say: 'La cuenta, por favor', accept: ['rachunek proszę', 'poproszę rachunek', 'rachunek poprosze'], answer: 'rachunek proszę', word: 'la-cuenta' },
          { type: 'mc', q: '¡Está rico!', prompt: 'Co to znaczy?', options: ['Jest smaczne!', 'Jest drogie!', 'Nie ma!', 'Gdzie to?'], answer: 'Jest smaczne!', word: 'rico' },
          { type: 'speak', q: 'Quiero un café, por favor', word: 'quiero' },
          { type: 'translate', dir: 'pl-es', q: 'woda', accept: ['agua', 'el agua'], answer: 'agua', word: 'agua' },
          { type: 'mc', prompt: 'Chcesz zapłacić. Mówisz:', q: 'Kończysz posiłek:', options: ['La cuenta, por favor', '¿De dónde eres?', 'Mucho gusto', 'Buenas noches'], answer: 'La cuenta, por favor', word: 'la-cuenta' }
        ]
      }
    ]
  },
  {
    id: 5, title: 'W mieście', subtitle: 'Pytanie o drogę', icon: '🏙️',
    lessons: [
      {
        id: 'u5l1', title: '¿Dónde está?', subtitle: 'Gdzie jest?',
        exercises: [
          { type: 'mc', q: '¿Dónde está?', prompt: 'Co to znaczy?', say: '¿Dónde está el baño?', options: ['Gdzie jest?', 'Co to jest?', 'Kto to?', 'Ile kosztuje?'], answer: 'Gdzie jest?', word: 'donde-esta' },
          { type: 'mc', q: 'el baño', prompt: 'Co to znaczy?', options: ['toaleta', 'kuchnia', 'sklep', 'ulica'], answer: 'toaleta', word: 'bano' },
          { type: 'fill', q: '¿Dónde ___ el baño?', options: ['está', 'es'], answer: 'está', word: 'donde-esta' },
          { type: 'match', pairs: [{ es: 'aquí', pl: 'tutaj' }, { es: 'a la izquierda', pl: 'w lewo' }, { es: 'a la derecha', pl: 'w prawo' }, { es: 'la calle', pl: 'ulica' }] },
          { type: 'build', prompt: 'Zapytaj: Gdzie jest toaleta?', answer: ['¿Dónde', 'está', 'el', 'baño?'], say: '¿Dónde está el baño?', word: 'bano' },
          { type: 'translate', dir: 'es-pl', q: 'Está a la derecha', say: 'Está a la derecha', accept: ['jest po prawej', 'po prawej', 'jest na prawo'], answer: 'jest po prawej', word: 'derecha' },
          { type: 'mc', q: 'a la izquierda', prompt: 'Co to znaczy?', say: 'a la izquierda', options: ['w lewo', 'w prawo', 'prosto', 'tutaj'], answer: 'w lewo', word: 'izquierda' },
          { type: 'speak', q: '¿Dónde está el baño?', word: 'donde-esta' },
          { type: 'translate', dir: 'pl-es', q: 'tutaj', accept: ['aquí', 'aqui'], answer: 'aquí', word: 'aqui' },
          { type: 'mc', q: 'la calle', prompt: 'Co to znaczy?', options: ['ulica', 'plac', 'dom', 'park'], answer: 'ulica', word: 'calle' }
        ]
      }
    ]
  },
  {
    id: 6, title: 'Czas i dzień', subtitle: 'Godziny i codzienność', icon: '🕒',
    lessons: [
      {
        id: 'u6l1', title: 'El tiempo', subtitle: 'Dziś, jutro, teraz',
        exercises: [
          { type: 'mc', q: 'hoy', prompt: 'Co to znaczy?', options: ['dzisiaj', 'jutro', 'wczoraj', 'teraz'], answer: 'dzisiaj', word: 'hoy' },
          { type: 'mc', q: 'mañana', prompt: 'Co to znaczy?', say: 'mañana', options: ['jutro / rano', 'wczoraj', 'noc', 'teraz'], answer: 'jutro / rano', word: 'manana' },
          { type: 'mc', q: 'ahora', prompt: 'Co to znaczy?', options: ['teraz', 'później', 'nigdy', 'zawsze'], answer: 'teraz', word: 'ahora' },
          { type: 'match', pairs: [{ es: 'hoy', pl: 'dzisiaj' }, { es: 'mañana', pl: 'jutro' }, { es: 'ahora', pl: 'teraz' }, { es: 'todos los días', pl: 'codziennie' }] },
          { type: 'fill', q: '___ estudio español.', say: 'Hoy estudio español', options: ['Hoy', 'Ayer'], answer: 'Hoy', word: 'hoy' },
          { type: 'translate', dir: 'es-pl', q: '¿Qué hora es?', say: '¿Qué hora es?', accept: ['która godzina', 'która jest godzina', 'która godzina?'], answer: 'która godzina?', word: 'que-hora-es' },
          { type: 'build', prompt: 'Powiedz: uczę się codziennie', answer: ['Estudio', 'todos', 'los', 'días'], say: 'Estudio todos los días', word: 'todos-los-dias' },
          { type: 'speak', q: '¿Qué hora es?', word: 'que-hora-es' },
          { type: 'mc', q: 'todos los días', prompt: 'Co to znaczy?', options: ['codziennie', 'cały dzień', 'w weekend', 'raz w roku'], answer: 'codziennie', word: 'todos-los-dias' },
          { type: 'translate', dir: 'pl-es', q: 'jutro', accept: ['mañana', 'manana'], answer: 'mañana', word: 'manana' }
        ]
      }
    ]
  },
  {
    id: 7, title: 'Zakupy', subtitle: 'Ceny i sklep', icon: '🛍️',
    lessons: [
      {
        id: 'u7l1', title: 'De compras', subtitle: 'Ile kosztuje?',
        exercises: [
          { type: 'mc', q: '¿Cuánto cuesta?', prompt: 'Co to znaczy?', say: '¿Cuánto cuesta?', options: ['Ile kosztuje?', 'Co to jest?', 'Gdzie jest?', 'Która godzina?'], answer: 'Ile kosztuje?', word: 'cuanto-cuesta' },
          { type: 'mc', q: 'caro', prompt: 'Co to znaczy?', options: ['drogi', 'tani', 'ładny', 'duży'], answer: 'drogi', word: 'caro' },
          { type: 'mc', q: 'barato', prompt: 'Co to znaczy?', options: ['tani', 'drogi', 'nowy', 'stary'], answer: 'tani', word: 'barato' },
          { type: 'match', pairs: [{ es: '¿cuánto cuesta?', pl: 'ile kosztuje?' }, { es: 'caro', pl: 'drogi' }, { es: 'barato', pl: 'tani' }, { es: 'euro', pl: 'euro' }] },
          { type: 'fill', q: '¿Cuánto ___?', options: ['cuesta', 'tienes'], answer: 'cuesta', word: 'cuanto-cuesta' },
          { type: 'translate', dir: 'es-pl', q: 'Es muy caro', say: 'Es muy caro', accept: ['jest bardzo drogie', 'to bardzo drogie', 'jest bardzo drogi'], answer: 'jest bardzo drogie', word: 'caro' },
          { type: 'build', prompt: 'Zapytaj: Ile to kosztuje?', answer: ['¿Cuánto', 'cuesta', 'esto?'], say: '¿Cuánto cuesta esto?', word: 'cuanto-cuesta' },
          { type: 'speak', q: '¿Cuánto cuesta?', word: 'cuanto-cuesta' },
          { type: 'mc', q: 'cinco euros', prompt: 'Ile to?', options: ['5 euro', '15 euro', '50 euro', '5 groszy'], answer: '5 euro', word: 'euro' },
          { type: 'translate', dir: 'pl-es', q: 'tani', accept: ['barato'], answer: 'barato', word: 'barato' }
        ]
      }
    ]
  },
  {
    id: 8, title: 'Czas wolny', subtitle: 'Co lubisz — gustar', icon: '⚽',
    lessons: [
      {
        id: 'u8l1', title: 'Me gusta', subtitle: 'Lubię / nie lubię',
        exercises: [
          { type: 'mc', q: 'me gusta', prompt: 'Co to znaczy?', say: 'me gusta', options: ['lubię / podoba mi się', 'nie lubię', 'mam', 'chcę'], answer: 'lubię / podoba mi się', word: 'me-gusta' },
          { type: 'mc', q: 'no me gusta', prompt: 'Co to znaczy?', options: ['nie lubię', 'lubię', 'nie mam', 'nie wiem'], answer: 'nie lubię', word: 'no-me-gusta' },
          { type: 'fill', q: '___ el fútbol.', say: 'Me gusta el fútbol', options: ['Me gusta', 'Tengo'], answer: 'Me gusta', word: 'me-gusta' },
          { type: 'match', pairs: [{ es: 'me gusta', pl: 'lubię' }, { es: 'no me gusta', pl: 'nie lubię' }, { es: 'fútbol', pl: 'piłka nożna' }, { es: 'música', pl: 'muzyka' }] },
          { type: 'translate', dir: 'es-pl', q: 'Me gusta la música', say: 'Me gusta la música', accept: ['lubię muzykę', 'podoba mi się muzyka'], answer: 'lubię muzykę', word: 'musica' },
          { type: 'build', prompt: 'Powiedz: Lubię piłkę nożną', answer: ['Me', 'gusta', 'el', 'fútbol'], say: 'Me gusta el fútbol', word: 'futbol' },
          { type: 'mc', q: 'la música', prompt: 'Co to znaczy?', options: ['muzyka', 'film', 'gra', 'książka'], answer: 'muzyka', word: 'musica' },
          { type: 'speak', q: 'Me gusta el fútbol', word: 'me-gusta' },
          { type: 'translate', dir: 'pl-es', q: 'nie lubię', accept: ['no me gusta'], answer: 'no me gusta', word: 'no-me-gusta' },
          { type: 'fill', q: 'No ___ gusta el café.', options: ['me', 'tú'], answer: 'me', word: 'no-me-gusta' }
        ]
      }
    ]
  },
  {
    id: 9, title: 'Plany', subtitle: 'ir a + zamiary', icon: '🗺️',
    lessons: [
      {
        id: 'u9l1', title: 'Voy a…', subtitle: 'Zamiary na przyszłość',
        exercises: [
          { type: 'mc', q: 'ir a + czasownik', prompt: 'Co to znaczy?', say: 'voy a estudiar', options: ['zamierzać coś zrobić', 'iść do domu', 'mieć coś', 'chcieć'], answer: 'zamierzać coś zrobić', word: 'ir-a' },
          { type: 'mc', q: 'Voy a estudiar', prompt: 'Co to znaczy?', options: ['Zamierzam się uczyć', 'Uczyłem się', 'Lubię się uczyć', 'Muszę'], answer: 'Zamierzam się uczyć', word: 'voy' },
          { type: 'fill', q: '___ a estudiar español.', say: 'Voy a estudiar español', options: ['Voy', 'Tengo'], answer: 'Voy', word: 'voy' },
          { type: 'match', pairs: [{ es: 'voy a', pl: 'zamierzam' }, { es: 'quiero ir', pl: 'chcę jechać' }, { es: 'ir a', pl: 'zamierzać' }, { es: 'mañana', pl: 'jutro' }] },
          { type: 'build', prompt: 'Powiedz: Zamierzam uczyć się hiszpańskiego', answer: ['Voy', 'a', 'estudiar', 'español'], say: 'Voy a estudiar español', word: 'voy' },
          { type: 'translate', dir: 'es-pl', q: 'Quiero ir a España', say: 'Quiero ir a España', accept: ['chcę jechać do hiszpanii', 'chcę pojechać do hiszpanii'], answer: 'chcę jechać do Hiszpanii', word: 'quiero-ir' },
          { type: 'mc', q: 'tener que', prompt: 'Co to znaczy?', say: 'tengo que estudiar', options: ['musieć', 'chcieć', 'lubić', 'mieć ochotę'], answer: 'musieć', word: 'tener-que' },
          { type: 'fill', q: 'Tengo ___ estudiar. (muszę)', say: 'Tengo que estudiar', options: ['que', 'a'], answer: 'que', word: 'tener-que' },
          { type: 'speak', q: 'Voy a estudiar español', word: 'voy' },
          { type: 'translate', dir: 'pl-es', q: 'muszę się uczyć', accept: ['tengo que estudiar'], answer: 'tengo que estudiar', word: 'tener-que' }
        ]
      }
    ]
  },
  {
    id: 10, title: 'Przeszłość', subtitle: 'Co było wczoraj', icon: '⏮️',
    lessons: [
      {
        id: 'u10l1', title: 'Ayer', subtitle: 'Wczoraj (czas przeszły)',
        exercises: [
          { type: 'mc', q: 'ayer', prompt: 'Co to znaczy?', options: ['wczoraj', 'jutro', 'dzisiaj', 'teraz'], answer: 'wczoraj', word: 'ayer' },
          { type: 'mc', q: 'Ayer comí paella', prompt: 'Kiedy to było?', say: 'Ayer comí paella', options: ['wczoraj (przeszłość)', 'jutro', 'teraz', 'codziennie'], answer: 'wczoraj (przeszłość)', word: 'ayer' },
          { type: 'mc', q: 'comí', prompt: 'Co to znaczy?', options: ['(ja) zjadłem', '(ja) jem', '(ja) zjem', 'jedzenie'], answer: '(ja) zjadłem', word: 'comi' },
          { type: 'match', pairs: [{ es: 'ayer', pl: 'wczoraj' }, { es: 'hoy', pl: 'dzisiaj' }, { es: 'mañana', pl: 'jutro' }, { es: 'ahora', pl: 'teraz' }] },
          { type: 'fill', q: '___ comí paella.', options: ['Ayer', 'Mañana'], answer: 'Ayer', word: 'ayer' },
          { type: 'mc', q: 'fui', prompt: 'Co to znaczy?', say: 'Ayer fui al cine', options: ['(ja) byłem / poszedłem', '(ja) idę', '(ja) jestem', '(ja) mam'], answer: '(ja) byłem / poszedłem', word: 'fui' },
          { type: 'build', prompt: 'Powiedz: Wczoraj zjadłem paellę', answer: ['Ayer', 'comí', 'paella'], say: 'Ayer comí paella', word: 'comi' },
          { type: 'translate', dir: 'es-pl', q: 'Ayer fui al cine', say: 'Ayer fui al cine', accept: ['wczoraj poszedłem do kina', 'wczoraj byłem w kinie'], answer: 'wczoraj poszedłem do kina', word: 'fui' },
          { type: 'speak', q: 'Ayer comí paella', word: 'comi' },
          { type: 'translate', dir: 'pl-es', q: 'wczoraj', accept: ['ayer'], answer: 'ayer', word: 'ayer' }
        ]
      }
    ]
  }
];

/** Płaska, uporządkowana lista lekcji (do sekwencyjnego odblokowywania). */
export function allLessons() {
  return UNITS.flatMap((u) => u.lessons);
}
