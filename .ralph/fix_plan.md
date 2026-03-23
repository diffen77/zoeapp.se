# Fix Plan — zoeapp.se CI Self-hosted Runner to ubuntu-latest

## Checklist

- [ ] Open all `.github/workflows/*.yml` files
- [ ] Search for `runs-on: self-hosted`
- [ ] Replace each with `runs-on: ubuntu-latest`
- [ ] Verify no `self-hosted` remains: `grep -r "self-hosted" .github/`
- [ ] npm run build (or equivalent)
- [ ] git commit -m "fix(ci): change runner from self-hosted to ubuntu-latest"
- [ ] git push origin main
- [ ] GitHub Actions starts immediately (check run queue)
- [ ] Latest run: conclusion=success
- [ ] Verify GHCR deployment (if applicable)

## Expected Result

Build should complete in < 5 minutes on GitHub-hosted ubuntu-latest runner.
