# Fix Plan — zoeapp.se CI Self-hosted Runner

- [ ] Find all .github/workflows/*.yml files
- [ ] Search for `runs-on: self-hosted`
- [ ] Replace with `runs-on: ubuntu-latest`
- [ ] npm run build succeeds (or equivalent build script)
- [ ] git commit + push origin main
- [ ] GitHub Actions starts immediately (no queued state)
- [ ] gh run view latest → conclusion=success
