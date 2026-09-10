# Verification

- Production build: `npm run build` (includes prerendering).
- Focused homepage tests: `npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/features/home/home.component.spec.ts`.
- On Windows without Chrome, the Karma ChromeHeadless launcher can use installed Chromium-based Edge. Set `CHROME_BIN` for the test process to the verified Edge executable path. On this workstation it is `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Angular test compilation checks other spec files even when `--include` selects only the homepage tests.
