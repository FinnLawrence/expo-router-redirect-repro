# expo-router redirect reproduction

On a static web export, a config redirect with a dynamic segment fills the parameter from the wrong part of the URL.

`app.json` has one redirect:

```json
{ "source": "/old/[id]", "destination": "/new/[id]" }
```

## Steps

1. `npm install`
2. `npm run export:web`
3. `npm run serve:static` (`npx expo serve` doesn't map dynamic pages like `old/[id].html`, so `scripts/serve-static.cjs` serves the export the way a static host would)
4. Open `http://localhost:8098/old/abc` in a browser.

**Expected:** the browser lands on `/new/abc` and the page shows `id: abc`.

**Actual:** the browser lands on `/new/old` and the page shows `id: old`.

The redirect works in `npx expo start --web` and when following a link inside the app. Both of those go through `applyRedirects`, not the static redirect page.
