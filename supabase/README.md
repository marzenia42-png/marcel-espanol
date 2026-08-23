# Supabase — backend AI + hosting dla ¡Vamos!

Marcel ma własny projekt Supabase → używamy go do dwóch rzeczy:
**(A)** bezpieczne proxy AI (tutor rozmowa), **(B)** hosting apki (link na telefon).

Wszystkie komendy są gotowe do skopiowania. Potrzebujesz raz zainstalowanego **Supabase CLI**
i **PROJECT_REF** Marcela (z adresu `https://<PROJECT_REF>.supabase.co`).

---

## A. Tutor AI (Edge Function `ai-tutor`)

To zamienia gotowy moduł `ai.js` w działającego tutora. Klucz API zostaje na serwerze Marcela.

```powershell
# 1) zaloguj CLI i podlicz projekt Marcela
supabase login
supabase link --project-ref <PROJECT_REF>

# 2) ustaw klucz do modelu (sekret po stronie serwera — NIE w aplikacji)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-XXXXXXXX

# 3) wdróż funkcję
supabase functions deploy ai-tutor --no-verify-jwt
```

Endpoint (wklej w aplikacji → **Ustawienia → Rozmowa z AI**):
```
https://<PROJECT_REF>.supabase.co/functions/v1/ai-tutor
```

Domyślny model: `claude-haiku-4-5` (tani, szybki, wystarcza dla A1/A2).
Funkcja obsługuje 2 tryby: `chat` (rozmowa) i `exercises` (ćwiczenia adaptacyjne pod słabe słowa).

> Koszt: płacisz tylko za realne zapytania do modelu (grosze przy Haiku). Dopóki nie ustawisz
> klucza i URL-a — aplikacja działa w 100% bez AI (cała nauka offline).

---

## B. Hosting apki na Supabase Storage (link na telefon)

```powershell
# w katalogu projektu:
cd E:\Dario\projekty\marcel-espanol
$env:SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
$env:SUPABASE_SERVICE_KEY="<service_role_key_Marcela>"   # sekret — tylko w ENV
node supabase/host-static.mjs
```

Skrypt utworzy publiczny bucket `vamos`, wgra całą apkę z poprawnymi typami MIME i wypisze URL:
```
https://<PROJECT_REF>.supabase.co/storage/v1/object/public/vamos/index.html
```
Ten link Marcel otwiera na telefonie i instaluje jako aplikację (PWA: „Dodaj do ekranu głównego").

> Po każdej aktualizacji kodu odpal skrypt ponownie (nadpisuje pliki). Podbij `CACHE` w `sw.js`,
> żeby telefon pobrał świeżą wersję.

---

## Bezpieczeństwo

- Klucz modelu (`ANTHROPIC_API_KEY`) i `service_role` **nigdy** nie są w repo ani w aplikacji — tylko w ENV / sekretach Supabase.
- Bucket `vamos` jest publiczny **tylko do odczytu** (statyczne pliki apki, zero danych osobowych).
- Postępy Marcela zostają lokalnie w jego telefonie (`localStorage`) — nic nie wychodzi na zewnątrz.
