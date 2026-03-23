# Task: Fix zoeapp.se CI Workflow — Self-hosted Runner Issue

## Repo
~/Projects/zoeapp.se

## Vad ska byggas
zoeapp.se GH Actions workflow har `runs-on: self-hosted` men inga self-hosted runners är registrerade. Build har legat queued i 15h. Fix: byt till `runs-on: ubuntu-latest` (GitHub-hosted runner).

## Filer att ändra/skapa
- `.github/workflows/build.yml` (eller motsv.) — ändra runs-on directive
- Alla GH workflow-filer som använder self-hosted

## Acceptance Criteria
1. .github/workflows/*.yml: `runs-on: ubuntu-latest` (inte self-hosted)
2. Push till main → GH Actions startar omedelbart (ingen queued)
3. Build & Deploy to GHCR = success
4. gh run list --limit 1 visar status=completed conclusion=success

## Test-kommando
```bash
gh run list --repo diffen77/zoeapp.se --limit 1
gh run view <run-id> --repo diffen77/zoeapp.se
```

## Build-kommando
```bash
npm run build (eller motsv. för zoeapp.se)
```

## Notering
- Sök alla .github/workflows/*.yml för `runs-on: self-hosted`
- Ersätt med `runs-on: ubuntu-latest`
- Push → GitHub Actions körs omedelbart utan queued-väntan
