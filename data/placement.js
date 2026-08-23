/* placement.js — test poziomujący (12 pytań, rosnąca trudność).
   W UI dołączana jest opcja „Nie wiem". Wynik nadpisuje deklarację poziomu.   */

export const PLACEMENT = [
  { q: '„Hola" znaczy…', options: ['Cześć', 'Dziękuję', 'Tak', 'Dom'], answer: 'Cześć', level: 'A0' },
  { q: '„Gracias" znaczy…', options: ['Proszę', 'Dziękuję', 'Przepraszam', 'Do widzenia'], answer: 'Dziękuję', level: 'A0' },
  { q: 'Jak po hiszpańsku „tak"?', options: ['Sí', 'No', 'Y', 'Hola'], answer: 'Sí', level: 'A0' },
  { q: '„Me llamo Marcel" znaczy…', options: ['Mam na imię Marcel', 'Lubię Marcela', 'To jest Marcel', 'Gdzie Marcel?'], answer: 'Mam na imię Marcel', level: 'A1' },
  { q: 'O co pyta „¿Cómo estás?"', options: ['Jak się masz?', 'Skąd jesteś?', 'Jak masz na imię?', 'Ile masz lat?'], answer: 'Jak się masz?', level: 'A1' },
  { q: '„uno, dos, tres" to…', options: ['1, 2, 3', '3, 2, 1', 'poniedziałek, wtorek…', 'kolory'], answer: '1, 2, 3', level: 'A1' },
  { q: '„Yo soy de Polonia" znaczy…', options: ['Jestem z Polski', 'Idę do Polski', 'Mieszkam sam', 'Lubię Polskę'], answer: 'Jestem z Polski', level: 'A1' },
  { q: 'Które znaczy „Ja jestem"?', options: ['Yo soy', 'Tú eres', 'Él es', 'Yo tengo'], answer: 'Yo soy', level: 'A2' },
  { q: '„la familia" znaczy…', options: ['rodzina', 'przyjaciel', 'dom', 'miasto'], answer: 'rodzina', level: 'A2' },
  { q: 'O co pyta „¿Cuántos años tienes?"', options: ['Ile masz lat?', 'Która godzina?', 'Jak się masz?', 'Ile to kosztuje?'], answer: 'Ile masz lat?', level: 'A2' },
  { q: '„Quiero un café, por favor" znaczy…', options: ['Poproszę kawę', 'Nie lubię kawy', 'Gdzie jest kawa?', 'Kawa jest dobra'], answer: 'Poproszę kawę', level: 'A2' },
  { q: '„Ayer comí paella" — kiedy to było?', options: ['wczoraj (przeszłość)', 'jutro', 'teraz', 'codziennie'], answer: 'wczoraj (przeszłość)', level: 'A2' }
];

/** Mapowanie wyniku 0..12 na poziom CEFR. */
export function scoreToCefr(score) {
  if (score <= 2) return 'A0';
  if (score <= 5) return 'A1';
  if (score <= 9) return 'A2';
  return 'B1';
}
