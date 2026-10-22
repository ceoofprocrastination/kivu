<div align="center">
  <img src="icon.svg" alt="KivU mark" width="76" height="76">
  <h1>K I V U</h1>
  <p><strong>A place for the thoughts that don't arrive in straight lines.</strong></p>
  <p>A local-first journal for the unfiltered, unfinished, very human parts of being alive.</p>
  <p>
    <a href="https://github.com/ceoofprocrastination/kivu">Source code</a>
    &nbsp; / &nbsp;
    <a href="https://github.com/ceoofprocrastination/kivu/issues">Report a bug</a>
  </p>
  <br>
</div>

---

> **CURRENTLY IN DEVELOPMENT**  
> The web journal is the version to use right now. The desktop edition is **coming soon**; there are no official desktop installers available yet. No AI models, no account system, and no first-party cloud sync.

## The idea

KivU is a small digital room to put your thoughts down without turning your life into a productivity contest. It is designed to feel more like a personal notebook than a dashboard: calm when you need quiet, expressive when you have something to say, and never disappointed when you disappear for a while.

**The principle is simple:** keep the mess. That's the music.

## What you can do

| Feature | What it is for |
| --- | --- |
| **Write freely** | Give an entry a title and write at your own pace in a comfortable, paper-inspired editor. |
| **Check in with your mood** | Record how you feel in your own words and revisit the history later. These are personal reflections, not diagnoses. |
| **Use writing prompts** | Get a gentle starting point when the blank page feels too blank. |
| **Look back** | Revisit saved entries and your recorded mood history. |
| **Make it yours** | Switch between light, dark, and system appearance settings. |
| **Find focus** | Use the writing-focused view to give the page more room and reduce distractions. |
| **Keep a copy** | Export journal data for backup and import it again when needed. |
| **Share a small recap** | Create an image of your mood week if you want to share a snapshot. Your private entry text is not intended as social content. |
| **Install the web app** | On supported browsers, add KivU to your home screen for a more app-like experience. |

Features may change while the project is being developed.

## Start here

### Use the web version

If you have a live deployment URL, open it and choose **Open your journal**. The repository itself is the source of truth for the project; if you do not have a deployment URL yet, run KivU locally using the steps below.

### Run it on your computer

KivU's web app is a static web app; a separate application backend is not required for local use. Python 3 is an easy way to serve the files over localhost.

```bash
# 1. Clone the repository
git clone https://github.com/ceoofprocrastination/kivu.git
cd kivu

# 2. Start a local web server
python -m http.server 8080
```

Then open these addresses in your browser:

| Page | Local address | Purpose |
| --- | --- | --- |
| Public landing page | `http://localhost:8080/index.html` | The KivU introduction and product story |
| Journal app | `http://localhost:8080/landing.html` | Write, check in, and revisit entries |
| Desktop status | `http://localhost:8080/downloads.html` | Desktop edition coming-soon page |
| Terms | `http://localhost:8080/terms.html` | Current terms draft |

The journal uses encrypted browser storage. Use the same browser and profile to access the same local entries; the PIN does not sync across devices. The service worker and install prompt work only in supported browsers and secure contexts such as HTTPS or localhost.

## Your writing belongs to you

KivU is **local-first**. The current web app stores entries in IndexedDB in the browser profile where you use it. It does not require an account and does not provide first-party cloud sync. KivU uses no AI models or AI-powered analysis.

The journal now uses a local PIN vault. Entry content and mood check-ins are encrypted with AES-GCM using a key derived from your PIN with PBKDF2; the key is not stored. This is client-side protection, not account recovery or cloud sync. Choose a 6–12 digit PIN (longer is safer) and remember it: there is no reset that can decrypt a forgotten PIN. Clearing browser data, losing a device, or uninstalling a browser can put locally stored writing at risk. Exported backups are plaintext JSON, so keep them somewhere private.

### Please make backups

1. Open KivU and go to the data controls in your profile/settings area.
2. Export a backup before clearing browser data, changing devices, or trying an unfamiliar build.
3. Keep the exported file somewhere safe. It may contain private writing, so treat it like a personal diary.
4. Test imports carefully and keep an untouched copy of the original backup.

Browser and future desktop storage will be separate unless a deliberate migration or sync feature is built. Do not assume that signing into another browser or device will bring your entries with you.

### A note about network requests

KivU does not send journal entry contents to a first-party server as part of normal writing. The page loads some libraries and fonts from third-party CDNs, which means your browser makes ordinary network requests to those providers. The journal contents are encrypted locally; the project does not offer cloud synchronization. Exported JSON backups are not encrypted, so store them privately.

## Project map

| File | Purpose |
| --- | --- |
| `index.html` | Public-facing landing page |
| `landing.html` | Main journal application and encrypted PIN vault |
| `app.html` | Compatibility copy of the journal app |
| `downloads.html` | Desktop coming-soon page; not an installer listing |
| `terms.html` | Terms draft |
| `manifest.webmanifest` | Web app metadata for supported install flows |
| `sw.js` | Service worker for supported offline/app-shell behaviour |
| `icon.svg` | KivU's mark |
| `package.json`, `electron-main.cjs` | Early desktop-app scaffolding; desktop releases are not currently available |

## The stack

| Layer | Technology |
| --- | --- |
| Interface | HTML, CSS, JavaScript |
| Styling utilities | Tailwind CSS via CDN |
| Local data | IndexedDB via Dexie, encrypted with Web Crypto (AES-GCM + PBKDF2) |
| Installable web app | Web App Manifest and Service Worker |
| Desktop exploration | Electron scaffolding; distribution is paused while the web experience is the focus |

There is no dedicated KivU application server or database service in the current web version.

## What comes next

The priority is to make the web version feel considered, useful, and unmistakably KivU before shipping desktop builds.

| Now | Later |
| --- | --- |
| Refine the writing experience and visual identity | Revisit desktop packaging after the web experience settles |
| Make everyday journaling feel quick and inviting | Explore thoughtful ways to create shareable content without exposing private entries |
| Keep local data controls understandable | Consider sync only if it can be built with clear privacy and ownership choices |

These are intentions, not release-date promises.

## Values

**No guilt loops.** Missing a day is not a failure.  
**No AI models.** Your journal is not a prompt for a model.  
**PIN-protected by design.** Journal content is encrypted locally; the PIN cannot be recovered if forgotten.  
**No forced performance.** You do not need to make every feeling productive or shareable.  
**Your writing is yours.** Backups and clear data controls matter more than engagement tricks.

## Contributing and licensing

KivU is still being shaped, so feedback and bug reports are welcome through [GitHub Issues](https://github.com/ceoofprocrastination/kivu/issues). When reporting a problem, include your browser and operating system, the steps to reproduce it, and a screenshot only if it does not expose private journal content.

The repository currently declares `UNLICENSED`. Until a licence is added, do not assume that the source may be redistributed or reused under an open-source licence. Third-party dependencies remain subject to their own licences.

---

<div align="center">
  <strong>KivU</strong><br>
  <em>For the noise inside.</em><br><br>
  <sub>Made for the page you don't have to perform on.</sub>
</div>
