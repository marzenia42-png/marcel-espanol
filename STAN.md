# STAN — marcel-espanol (¡Vamos!)

_Ostatnia sesja: 2026-08-23. PWA do nauki hiszpańskiego dla Marcela (18 lat, początkujący, Android)._

## ✅ Zrobione (v1 + fala 2)
- Vanilla JS/HTML/CSS, PWA offline (manifest + service worker), postępy w localStorage.
- **26 lekcji / 284 ćwiczenia / 185 słówek** (55 chunków). Jednostki 1–3 po 4 lekcje (12 ćw.), 4–10 po 2 lekcje (10 ćw.).
- 6 typów ćwiczeń: mc, translate, fill, build, match, **speak (wymowa AI)**.
- SRS Leitnera (5 pudełek), gamifikacja (XP/streak/5 serduszek), test poziomujący (12, CEFR).
- **Cel dzienny**, **Wyzwanie dnia**, panel postępów, eksport/import backupu, przypomnienia.
- **Innowacja AI:** trener wymowy (rozpoznawanie mowy on-device, za darmo) + lektor TTS + tutor LLM (roleplay, adaptacyjne ćwiczenia, „Wyjaśnij") przez proxy Supabase.
- Repo prywatne `marzenia42-png/marcel-espanol` (6 commitów, push OK).
- Backup na Drive: `claudia:BACKUP/marcel-espanol/`.

## 🔴 OTWARTE DECYZJE DARIO
1. **Live link dla Marcela** — wybierz:
   - **A)** repo publiczne + GitHub Pages → `https://marzenia42-png.github.io/marcel-espanol/` (darmo, ~1 min, apka bez sekretów). Trigger: Dario mówi „rób publiczne".
   - **B)** hosting na Supabase Marcela → potrzebny `PROJECT_REF` + `service_role key` (w ENV), skrypt `supabase/host-static.mjs`.
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
- Repo: https://github.com/marzenia42-png/marcel-espanol (prywatne)
- Backup Drive: `claudia:BACKUP/marcel-espanol/`
