# ¡Vamos! — hiszpański dla Marcela 🇪🇸

Prywatna aplikacja PWA do nauki hiszpańskiego **od zera do rozmowy**. Zbudowana dla Marcela (18 lat, początkujący, telefon z Androidem). Działa offline, instaluje się jak apka.

**Vanilla JS + HTML + CSS** — bez frameworka, bez build-stepu. Postępy w `localStorage`.

---

## ✨ Innowacja AI

1. **Trener wymowy (na urządzeniu, za darmo)** — Marcel czyta zdanie na głos, przeglądarka rozpoznaje mowę (Web Speech Recognition), a aplikacja ocenia trafność wymowy w %. Zero kosztów, zero klucza API. Działa na Chrome (Android/desktop).
2. **Lektor (TTS)** — każde hiszpańskie słowo/zdanie czytane natywnym głosem (`es-ES` lub `es-MX` wg wybranego wariantu).
3. **Rozmowa z tutorem AI (opcjonalna, LLM)** — czat po hiszpańsku dopasowany do poziomu, z korektą po polsku. Gotowy, *pluggable* moduł: klucz API **nigdy nie trafia do aplikacji** — trzyma go serwer proxy (np. Supabase Edge Function / Cloudflare Worker), a w Ustawieniach podaje się tylko jego adres URL.

---

## Funkcje v1

- **Onboarding**: poziom, cel, wariant (Hiszpania/LatAm), czas dzienny
- **Test poziomujący** (12 pytań) — wynik nadpisuje deklarację, ustawia poziom CEFR
- **Dashboard** mobile-first: poziom CEFR, XP, passa (streak), „lekcja dnia" (główny CTA)
- **Ścieżka 10 jednostek** (Powitania → Przeszłość), lekcje odblokowywane sekwencyjnie
  - Jednostki 1–3: **pełne** (4 lekcje × 10–12 ćwiczeń)
  - Jednostki 4–10: struktura + lekcja startowa (dobudowa falami)
- **6 typów ćwiczeń**: wybór (multiple choice), tłumaczenie, uzupełnianie luki, układanie zdania z klocków, dopasowywanie par, **wymowa (AI)**
- **SRS** — system Leitnera (5 pudełek); błędne słowo wraca częściej
- **Słówka** — karty hiszpański/polski/przykład/status; zwroty (chunki: `tener que`, `tener ganas de`…)
- **Gamifikacja** — XP, passa, 5 serduszek na lekcję, podsumowanie błędów, konfetti
- **Panel postępów** — trafność, słabe strony, pudełka powtórek, opanowane słowa

## Architektura

```
index.html          powłoka
css/styles.css      motyw ciemny, mobile-first
js/
  app.js            router + boot + rejestracja service workera
  dom.js            mikro-helper DOM + toast/konfetti
  storage.js        stan w localStorage (poziom, XP, streak, postępy, statystyki)
  srs.js            algorytm Leitnera (5 pudełek)
  speech.js         AI on-device: lektor (TTS) + trener wymowy (ASR)
  ai.js             AI tier-2: tutor LLM przez proxy (bez klucza w repo)
  exercises.js      6 typów ćwiczeń + sprawdzanie
  lesson.js         runner lekcji (serduszka, XP, podsumowanie)
  screens.js        ekrany (onboarding, dashboard, słówka, postępy, tutor, ustawienia)
data/
  lessons.js        treść ścieżki (10 jednostek)
  vocab.js          słownik + zwroty (id spięte z SRS)
  placement.js      test poziomujący
manifest.json, sw.js, icons/   PWA (instalacja + offline)
```

## Uruchomienie lokalne

```
cd E:\Dario\projekty\marcel-espanol
python -m http.server 8123 --bind 127.0.0.1
```
Następnie otwórz `http://127.0.0.1:8123` (wymagany serwer HTTP — moduły ES i service worker nie działają z `file://`).

## Deploy — GitHub Pages

Repo jest **prywatne**. GitHub Pages na repo prywatnym wymaga planu **GitHub Pro** (na darmowym trzeba ustawić repo jako publiczne lub użyć innego hostingu). Po włączeniu Pages (źródło: *GitHub Actions*) workflow `.github/workflows/pages.yml` publikuje całość automatycznie po każdym pushu na `main`.

Adres docelowy: `https://marzenia42-png.github.io/marcel-espanol/`

## Włączenie rozmowy z AI (opcjonalne)

1. Postaw serwer proxy (Supabase Edge Function / Cloudflare Worker), który przyjmuje `POST { mode, system, messages }`, dokłada klucz API po swojej stronie i zwraca `{ reply }`.
2. W aplikacji: **Ustawienia → Rozmowa z AI** → wklej adres URL serwera. Klucz zostaje na serwerze, nigdy w telefonie.
