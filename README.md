# Spiruzan™ by Valensa — Pet Supplement Feedback

Static HTML form for dogs & cats (Spirulina + Astaxanthin). Responses post to a Google Sheet via Apps Script.

## Deploy (GitHub Pages)
1. Repo Settings → **Pages** → Branch: `main`, Folder: `/ (root)` → **Save**.
2. Live at: "https://github.com/anuragpande1977/Spiruzan_User_Feedback"

## Configure Apps Script
- Create a Google Sheet with headers (Timestamp, Pet Species, ...).
- Add the Apps Script `doPost(e)` from instructions; deploy as **Web app** (`Execute as: Me`; `Who has access: Anyone`).
- Paste your Web App URL into `assets/app.js` as `SCRIPT_URL`.

## Files
- `index.html` – form markup
- `assets/styles.css` – styles
- `assets/app.js` – submit logic (POST to Google Apps Script)
- `assets/valensa-horiz-logo-white.png` – logo
