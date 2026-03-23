# RALPH SPEC: zoeapp.se CI — Self-hosted Runner Fix

**Task ID:** e04c3fea-ff6c-44e7-a040-3a6130377a88  
**Status:** ready  
**Repo:** zoeapp.se  
**Priority:** HIGH  
**ETA:** 15 min  

## Problem
GH Actions workflow uses `runs-on: self-hosted` but no self-hosted runners are registered. Build has been queued for 15+ hours (run 23405539139, cancelled by Lundin 2026-03-23).

## Root Cause
`.github/workflows/build.yml` (or similar) specifies `runs-on: self-hosted` without any registered runners in the GitHub repository.

## Solution (REQUIRED)
Change `runs-on: self-hosted` → `runs-on: ubuntu-latest` in **all** workflow files.

### Step 1: Find all workflow files with self-hosted
```bash
cd ~/Projects/zoeapp.se
grep -r "runs-on: self-hosted" .github/workflows/
```

### Step 2: Replace with ubuntu-latest
```bash
find .github/workflows -name "*.yml" -o -name "*.yaml" | \
  xargs sed -i '' 's/runs-on: self-hosted/runs-on: ubuntu-latest/g'
```

### Step 3: Verify changes
```bash
grep -r "runs-on:" .github/workflows/
# Should show: runs-on: ubuntu-latest (no self-hosted)
```

## Acceptance Criteria

✓ All workflow files use `runs-on: ubuntu-latest`  
✓ No `runs-on: self-hosted` remains  
✓ Push to main → GH Actions **starts immediately** (no queued state)  
✓ Latest run shows `conclusion: success`  
✓ Build & Deploy to GHCR completes successfully  

## Test Command

```bash
git log --oneline | head -1  # Verify commit
gh run list --limit 1 --json status,conclusion  # Verify run success
```

## Build Command

```bash
npm run build  # or equivalent for zoeapp.se
```

## Verification

```bash
# After push to main:
gh run list --limit 1
# Expected: latest run shows status=completed, conclusion=success
```

---
**Note:** This is a CI configuration fix, not a code change. GitHub-hosted ubuntu-latest runners are always available and require no setup.
