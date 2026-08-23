// ai-tutor — Supabase Edge Function (Deno).
// Bezpieczne proxy między aplikacją ¡Vamos! a modelem AI (Claude).
// Klucz API czytany z ENV (sekret Supabase) — NIGDY nie trafia do aplikacji/repo.
//
// Deploy (na projekcie Marcela):
//   supabase functions deploy ai-tutor --no-verify-jwt
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...   (ustawia Marcel/Dario)
// Endpoint (wklejany w aplikacji → Ustawienia → Rozmowa z AI):
//   https://<PROJECT_REF>.supabase.co/functions/v1/ai-tutor

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

async function callClaude(model: string, system: string, messages: unknown, maxTokens = 700) {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return { error: "Brak ANTHROPIC_API_KEY (ustaw: supabase secrets set ...)" };
  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages }),
  });
  if (!res.ok) return { error: `Claude HTTP ${res.status}: ${await res.text()}` };
  const data = await res.json();
  const text = (data?.content?.[0]?.text) ?? "";
  return { text };
}

/** Usuwa ewentualne ```json ... ``` z odpowiedzi modelu. */
function stripFences(s: string) {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  let payload: any;
  try { payload = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }

  const model = payload.model || "claude-haiku-4-5";
  const system = payload.system || "Jesteś nauczycielem hiszpańskiego.";

  // --- tryb: rozmowa ---
  if (payload.mode === "chat") {
    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    const out = await callClaude(model, system, messages);
    if (out.error) return json({ error: out.error }, 502);
    return json({ reply: out.text });
  }

  // --- tryb: ćwiczenia adaptacyjne pod słabe słowa ---
  if (payload.mode === "exercises") {
    const weak = Array.isArray(payload.weakWords) ? payload.weakWords : [];
    const ask = [
      "Ułóż 6 krótkich ćwiczeń dla ucznia hiszpańskiego (poziom A1/A2).",
      weak.length ? `Skup się na słowach z problemami: ${weak.join(", ")}.` : "Powtórka podstaw.",
      "Zwróć WYŁĄCZNIE tablicę JSON (bez komentarzy, bez markdown).",
      'Dozwolone typy i pola:',
      '{"type":"mc","q":"...","options":["a","b","c","d"],"answer":"a"}',
      '{"type":"translate","dir":"es-pl","q":"...","accept":["..."],"answer":"..."}',
      '{"type":"fill","q":"zdanie z ___","options":["a","b"],"answer":"a"}',
      "answer MUSI być jednym z options (dla mc/fill).",
    ].join("\n");
    const out = await callClaude(model, system, [{ role: "user", content: ask }], 900);
    if (out.error) return json({ error: out.error }, 502);
    try {
      const arr = JSON.parse(stripFences(out.text));
      return json({ exercises: Array.isArray(arr) ? arr : [] });
    } catch {
      return json({ exercises: [], raw: out.text }, 200);
    }
  }

  return json({ error: "Nieznany mode (użyj 'chat' lub 'exercises')" }, 400);
});
