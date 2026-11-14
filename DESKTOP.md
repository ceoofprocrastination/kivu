# Turning KivU into a desktop app

KivU already has an Electron shell (`electron-main.cjs`) and electron-builder config in `package.json`. You are mostly packaging, not building.

## 1. Run it
```
npm install
npm start            # opens landing.html (the journal) in a desktop window
```

## 2. Build installers
```
npm run dist:win     # MSI + NSIS installer + portable .exe   (build on Windows)
npm run dist:mac     # DMG + zip                              (build on a Mac)
npm run dist:linux   # AppImage + deb                         (build on Linux)
```
Output goes to `release/`. Icons are already in `build/` (`.ico`, `.icns`, `.png`). Build each OS on that OS, or use GitHub Actions with a matrix of windows/macos/ubuntu runners.

## 3. Before you ship (the important part)
1. **Make it work offline.** Today the pages load Tailwind, Dexie, Three.js, Transformers.js and Google Fonts from CDNs. A private, local-first desktop app should not need the internet to open.
   - Replace the Tailwind CDN script with a built CSS file (`npx tailwindcss -i in.css -o tailwind.css --minify`). The CDN build is for prototyping only.
   - `npm i dexie three @huggingface/transformers @fontsource/fraunces @fontsource/caveat @fontsource/dm-sans`, copy what you need into a `vendor/` folder, point the `<script>`/import map at it, and add `vendor/**` to `build.files`.
   - Whisper: download the `Xenova/whisper-tiny.en` model files into `models/`, then set `env.allowRemoteModels = false; env.localModelPath = './models/'` so dictation works with no download.
2. **Serve over a custom protocol, not `file://`.** `loadFile` works for the classic scripts, but module imports and `fetch` of local files are restricted on `file://`. Use `protocol.handle('app', ...)` to serve the app folder from `app://kivu/`, then `win.loadURL('app://kivu/landing.html')`. This also gives IndexedDB a stable origin.
3. **Microphone.** `electron-main.cjs` now allows only the `media` permission. On macOS also add to `build.mac`: `"extendInfo": {"NSMicrophoneUsageDescription": "KivU uses the microphone for on-device dictation."}` plus hardened-runtime entitlements (`com.apple.security.device.audio-input`).
4. **Song search needs internet.** It queries Apple's iTunes Search API. Keep it, but make it fail gracefully offline (it already shows a message), and mention it in the Privacy page.
5. **Where the data lives.** The journal is encrypted inside the app's Chromium profile (the app name is still `Mysa` on purpose, so old journals stay found). Tell users: forgetting the PIN is unrecoverable, and **Export a backup** before uninstalling or moving machines.
6. **Content-Security-Policy.** Add a CSP `<meta>` once everything is local, for example `default-src 'self'; img-src 'self' data: https://*.mzstatic.com; media-src https://*.mzstatic.com; connect-src 'self' https://itunes.apple.com; script-src 'self' 'wasm-unsafe-eval'`.

## 4. Signing and updates
- **Windows:** unsigned installers trigger SmartScreen warnings. Buy a code-signing certificate and set `CSC_LINK` / `CSC_KEY_PASSWORD`.
- **macOS:** requires an Apple Developer ID plus notarization (electron-builder supports it via `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`), or the app will not open for most users.
- **Updates:** `npm i electron-updater`, set a `publish` target (GitHub Releases is easiest), call `autoUpdater.checkForUpdatesAndNotify()` after the window opens. Only do this after signing works.

## 5. Test checklist
Fresh install, create a PIN, quit and reopen, unlock, write, attach a song, dictate, export a backup, import it on a second machine, run with Wi-Fi off, uninstall and reinstall.

## Lighter alternatives
- **PWA install**: `manifest.webmanifest` and `sw.js` already exist, so Chrome and Edge can install the site as an app with zero extra work (no mic or signing hassles).
- **Tauri**: ~10x smaller installers than Electron, but a Rust toolchain and a rewrite of the shell.
