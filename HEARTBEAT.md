# HEARTBEAT.md - John

## Varje heartbeat — I DENNA ORDNING

### 0. Läs patterns.md INNAN du börjar
Läs `memory/patterns-john.md` om den finns. Det är dina detekterade mönster från tidigare sessioner. Använd dem för att undvika upprepade misstag.

### 1. Kör kön (högsta prio)
Läs /Users/diffen/.openclaw/workspace/QUEUE.md.
Ta första kortet i "## Ready".
Flytta till "## In Progress".
Kör Aider via exec:

```
cd <REPO_PATH> && git config user.email "john@lediff.se" && git config user.name "John (dev-agent)" && AIDER_NO_AUTO_UPDATE=1 OLLAMA_API_BASE=http://localhost:11434 aider --no-pretty --no-fancy-input --model ollama_chat/qwen3-coder:30b --no-check-update --yes --auto-commits --file <FIL> --message "<UPPGIFT>"
```

Verifiera att Aider commitade (git log --oneline -1).
Pusha: git push origin main
**Kör retro** (FÖRE att du flyttar till Done):
```
bash /Users/diffen/.openclaw/workspace/scripts/agent-retro.sh john "<vad gick bra>" "<vad gick dåligt>" "<vad lärde du dig>"
```
Exempel: `bash /Users/diffen/.openclaw/workspace/scripts/agent-retro.sh john "Aider fixade filen rätt" "Glömde git log först" "Alltid verifiera commit innan push"`
Flytta kort till "## Done".
Ta nästa kort.

### 2. GitHub-ansvar (om kön är tom)
Kolla alla repos:
- cd /tmp/mfe-host && gh run list --limit 1 --json conclusion -q '.[0].conclusion'
- cd /tmp/mission-control && gh run list --limit 1 --json conclusion -q '.[0].conclusion'
- cd /tmp/af-portal && gh run list --limit 1 --json conclusion -q '.[0].conclusion'
- cd /tmp/trading-agent && gh run list --limit 1 --json conclusion -q '.[0].conclusion'

Om "failure" → kolla fellog och fixa direkt med Aider.

### 3. Repos
- mfe-host: /tmp/mfe-host
- mission-control: /tmp/mission-control
- af-portal: /tmp/af-portal
- trading-agent: /tmp/trading-agent
- reko-saas: /tmp/reko-saas

## Regler
- ALDRIG Anthropic. ALLTID ollama_chat/qwen3-coder:30b via Aider.
- Verifiera alltid att Aider faktiskt commitade innan du markerar Done.
- Stör ALDRIG 23:00-08:00.
- Inget att göra = HEARTBEAT_OK
