# Verification

- Production build: `npm run build` (includes prerendering).
- Focused homepage tests: `npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/features/home/home.component.spec.ts`.
- On Windows without Chrome, the Karma ChromeHeadless launcher can use installed Chromium-based Edge. Set `CHROME_BIN` for the test process to the verified Edge executable path. On this workstation it is `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Angular test compilation checks other spec files even when `--include` selects only the homepage tests.
- If Edge exits early through the Karma launcher, use `npm test -- --watch=false --no-browsers` with the desired `--include` options, then open `http://localhost:9876` in a separately launched test browser. Use `--no-browsers`, not `--browsers=false` (the latter is parsed as a browser named `false`).
- Routed portfolio pages use the shared editorial styles in `src/styles.scss`; legacy component SCSS files are not loaded by those pages.
- Design constraints: neutral off-white and charcoal, square corners, no decorative icons/gradients/shadows or hover motion. Use accessible filters and native details for interaction, and static skeletons for asynchronous content.
- Contact prepares a mailto draft, not a backend submission. Keep the contact copy and privacy notice consistent with this behavior.
