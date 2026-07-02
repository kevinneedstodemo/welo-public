# Welo Global static web app

This repository contains a lightweight HTML, CSS, JavaScript, and JSON web app for Welo Global. The app is designed to run as a static site and is compatible with GitHub Pages.

## GitHub Pages URL

For the repository shown in the screenshot, the GitHub Pages URL should be:

```text
https://kevinneedstodemo.github.io/welo-public/
```

GitHub Pages does not create a clickable public URL until the selected publishing branch finishes building. In the screenshot, Pages is configured to build from the `codex/create-web-app-for-welo` branch and the `/(root)` folder, so the site should become available at the URL above after the Pages build completes successfully.

## If the page is not available yet

1. Open **Settings → Pages**.
2. Confirm **Source** is set to **Deploy from a branch**.
3. Confirm the branch is `codex/create-web-app-for-welo` and the folder is `/(root)`.
4. Wait for the Pages build to finish. The page may show a 404 while GitHub is still building the site.
5. Visit `https://kevinneedstodemo.github.io/welo-public/`.

If the branch is later merged into `main`, switch the Pages branch to `main` with the `/(root)` folder, save the setting, and wait for GitHub Pages to rebuild.

## Local preview

Because the app loads `data/company.json` with `fetch`, preview it with a local web server instead of opening `index.html` directly from the file system.

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Files

- `index.html` defines the page structure and sections.
- `styles.css` contains responsive visual styling.
- `app.js` loads JSON content, renders cards and metrics, toggles the mobile menu, and handles the demo form.
- `data/company.json` contains editable site content.
- `.nojekyll` tells GitHub Pages to serve the static files directly without Jekyll processing.
