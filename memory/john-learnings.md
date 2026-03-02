# John Learnings — Vad som funkar och inte

## Kända begränsningar
- Filer >300 rader → Aider kraschar (signal 15). Dela upp.
- Max 1-2 filer per Aider-anrop — fler = loop
- En uppgift per anrop — tydlig, specifik, kort

## Repos och quirks
- mfe-host: /tmp/mfe-host — monorepo, packages/host/src och packages/api/src
- mission-control: /tmp/mission-control — Next.js, src/app/
- af-portal: /tmp/af-portal — Vite + React, frontend :5082 API :5081

## Kortformat som funkar bäst
Dåligt: "Fixa login"
Bra: "I packages/host/src/Login.tsx rad 45, ändra redirect från navigate('/') till window.location.href='/'"

## Jobblogg

## 2026-03-01 14:42 [QA-2026-03-01-team-url] packages/host/src/components/Shell.tsx
- Rader: ?
- Resultat: ✅ OK
- Uppgift: In the sidebar navigation links for Dashboard, Moduler and Team: replace any React Router Link or navigate() calls with window.location.href so that clicking a nav link does a full page navigation and the URL updates correctly in the browser address bar. Keep the same href values (/, /modules, /settings/team).

## 2026-03-01 14:43 [QA-2026-03-01-routing] packages/host/src/App.tsx
- Rader:       47
- Resultat: ✅ OK
- Uppgift: Fix the routing so Shell's internal routes work correctly. Change line 44 from <Route path='/*' element={user ? <Shell /> : <LandingPage />} /> to <Route path='/' element={user ? <Shell /> : <LandingPage />} />. This allows Shell's internal Routes to match /modules and /settings/team correctly without path stripping.

## 2026-03-01 14:44 [QA-2026-03-01-silent-401] packages/host/src/store/auth.ts
- Rader:      238
- Resultat: ✅ OK
- Uppgift: In the tryRestoreSession and any other auth functions that call /api/auth/me or /api/auth/refresh: wrap the fetch calls in try/catch and silence 401 and 400 errors (they are expected when no token exists). Do not console.error or console.warn these specific status codes — just handle them silently and return/reject gracefully.

## 2026-03-01 19:04 [JOHN-001] packages/api/src/routes/tenants.ts
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:07 [JOHN-002] 
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:12 [JOHN-003] 
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:14 [JOHN-004] src/app/api/queue/route.ts
- Rader:       69
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:24 [JOHN-005] src/app/api/queue/route.ts
- Rader:       69
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:33 [JOHN-006] 
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 19:39 [JOHN-007] packages/api/src/routes/tenants.ts
- Rader:       18
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 20:22 [JOHN-008] src/app/api/office/route.ts
- Rader:       70
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 20:44 [JOHN-009] 
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 20:45 [JOHN-008] src/app/api/queue/done/route.ts
- Rader: ?
- Resultat: ✅ OK
- Uppgift: 

## 2026-03-01 23:42 [JOHN-011] src/app/office/page.tsx
- Rader:      326
- Resultat: ✅ OK
- Uppgift: 

---

## Lärdom 2026-03-01 — JOHN-011 misslyckades

**Vad hände:** Aider körde på JOHN-011 (office/page.tsx), exit code 0, men ändrade bara .gitignore — inte målfilen.

**Varför:** Aider körde med `--file src/app/office/page.tsx` men modellen valde att skriva .gitignore-rader istället för att ändra den angivna filen.

**Lärdom:**
- Exit code 0 = Aider avslutade utan fel. Det betyder INTE att uppgiften är gjord.
- **Verifiera alltid:** `git log --oneline -1` — är det ett nytt commit? Är commit-meddelandet relevant?
- Om Aider committade men ändrade fel fil → kör om med tydligare instruktion
- Om inget commit → Aider gissade att det inte behövdes någon ändring → omformulera uppgiften, var mer explicit

**Rätt flöde:**
1. Kör Aider
2. `git log --oneline -1` — nytt commit?
3. Är commit-meddelandet kopplat till uppgiften?
4. Om ja → Done. Om nej → kör om med skarpare instruktion.
5. Markera ALDRIG Done utan ett verifierat commit.
