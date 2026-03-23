# Fix Plan — zoeapp.se CI Self-hosted Runner

- [x] Find all .github/workflows/*.yml files
- [x] Search for `runs-on: self-hosted`
- [x] Replace with `runs-on: ubuntu-latest`
- [ ] npm run build succeeds (or equivalent build script)
- [ ] git commit + push origin master
- [ ] GitHub Actions starts immediately (no queued state)
- [ ] gh run view latest → conclusion=success
