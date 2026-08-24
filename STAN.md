# STAN — marcel-espanol (¡Vamos!)

_Ostatnia sesja: 2026-08-24. PWA do nauki hiszpańskiego dla Marcela (18 lat, początkujący, Android)._

## ✅ Zrobione (v1 + fala 2)
- Vanilla JS/HTML/CSS, PWA offline (manifest + service worker), postępy w localStorage.
- **26 lekcji / 284 ćwiczenia / 185 słówek** (55 chunków). Jednostki 1–3 po 4 lekcje (12 ćw.), 4–10 po 2 lekcje (10 ćw.).
- 6 typów ćwiczeń: mc, translate, fill, build, match, **speak (wymowa AI)**.
- SRS Leitnera (5 pudełek), gamifikacja (XP/streak/5 serduszek), test poziomujący (12, CEFR).
- **Cel dzienny**, **Wyzwanie dnia**, panel postępów, eksport/import backupu, przypomnienia.
- **Innowacja AI:** trener wymowy (rozpoznawanie mowy on-device, za darmo) + lektor TTS + tutor LLM (roleplay, adaptacyjne ćwiczenia, „Wyjaśnij") przez proxy Supabase.
- **Wygląd (24.08, fala 3):** motyw jasny/ciemny/**auto** + rozmiar tekstu (Normalny/Duży/Największy) w Ustawieniach → sekcja „🎨 Wygląd"; naprawiony bug „czarna czcionka na czarnym tle" (`color-scheme` + jawny kolor placeholdera + 2 zaszyte ciemne tła na zmienne); cache sw podbity `vamos-v2→v3`. Zweryfikowane na renderze (oba motywy + duża czcionka). **Uwaga: zmiany lokalne — do wyświetlenia u Marcela trzeba commit+push (Pages auto-deploy).**
- Repo **publiczne** `marzenia42-png/marcel-espanol` **od 24.08.2026** — 0 sekretów w historii (skan całej historii commitów przed publikacją; klucz AI tylko w ENV/sekretach Supabase).
- **LIVE dla Marcela:** `https://marzenia42-png.github.io/marcel-espanol/` (GitHub Pages przez workflow Actions, HTTPS wymuszony, ścieżki względne → PWA offline działa pod podkatalogiem).
- Backup na Drive: `claudia:BACKUP/marcel-espanol/`.

## 🔴 OTWARTE DECYZJE DARIO
1. ✅ **ROZSTRZYGNIĘTE (24.08.2026) — wariant A:** repo publiczne + GitHub Pages. Live: `https://marzenia42-png.github.io/marcel-espanol/`. Marcel otwiera link na telefonie → „Dodaj do ekranu głównego" (PWA offline). Wariant B (hosting Supabase) porzucony.
2. **Tutor AI (LLM)** — czy włączamy (koszt: grosze/Claude Haiku)? Deploy: `supabase/README.md`. Do czasu decyzji apka działa w 100% bez AI (nauka + wymowa + lektor dostępne).

## Jak dostarczyć link
**A – publiczne:** (po zgodzie Dario) `gh repo edit --visibility public` + włączyć Pages (Actions).
**B – Supabase:** patrz `supabase/README.md` (sekcja B) — 1 blok kopiuj-wklej.

## Podgląd lokalny
```
cd E:\Dario\projekty\marcel-espanol
python -m http.server 8123 --bind 127.0.0.1
```
→ `http://127.0.0.1:8123`

## Roadmapa (fala 3 — do decyzji)
- Dobudowa treści: 3.–4. lekcja w jednostkach 4–10 (silnik + wzorzec gotowe).
- Rozpoznawanie mowy w zwykłych ćwiczeniach (nie tylko trener).
- Codzienne wyzwanie z rankingiem/serią, statystyki tygodniowe.
- Prawdziwe push-powiadomienia (wymaga Push API + serwer/VAPID).

## Lokalizacje
- Kod: `E:\Dario\projekty\marcel-espanol`
- Repo: https://github.com/marzenia42-png/marcel-espanol (**publiczne** od 24.08.2026)
- Live (Marcel): https://marzenia42-png.github.io/marcel-espanol/
- Backup Drive: `claudia:BACKUP/marcel-espanol/`
