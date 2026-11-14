const { app, BrowserWindow, shell, Menu, session } = require('electron');
const path = require('node:path');

// Preserve the previous Mysa user-data folder so existing local journals remain discoverable.
app.setName('Mysa'); // Keep the legacy profile path so existing local journals remain accessible.

const isExternal = (url) => /^https?:\/\//i.test(url);
function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 960, minWidth: 360, minHeight: 620,
    show: false, backgroundColor: '#f6ecd8', title: 'Kivu',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isExternal(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    const current = win.webContents.getURL();
    if (url.startsWith('file://') && url !== current) return;
    if (isExternal(url)) { event.preventDefault(); shell.openExternal(url); }
  });
  win.loadFile(path.join(__dirname, 'landing.html'));
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch('enable-features', 'Vulkan,UseSkiaRenderer');
  Menu.setApplicationMenu(null);
  // Only the microphone (for Whisper dictation) may be requested; everything else is denied.
  session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => cb(permission === 'media'));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
