
# Google Dork Domain Grabber Scripts

This repository contains **two JavaScript scripts** that you can paste into your browser's Developer Console to extract domain names from Google search results.

---

## 1. `filter_substring.js` — Extract Domains Matching a Specific Path

### Purpose
This script extracts domains from all URLs in the current page **that contain a specific substring** (for example: `/wp-content/uploads/`).

### How to Use
1. Go to Google search results (Google Images or normal search) where your dork returns results.
2. Scroll down to load all results on the current page.
3. Open **Developer Tools** (Press `F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
4. Go to the **Console** tab.
5. Paste the entire script into the console.
6. Change the value of:
   ```js
   var filterSubstring = "/wp-content/uploads/";
   ```
   to match your dork path or keyword.
7. Press **Enter**.
8. The script will:
   - Find all URLs containing that substring.
   - Extract unique domains.
   - Save them into a file named `domain_list.txt`.

---

## 2. `google_fetch.js` — Auto Pagination Domain Grabber

### Purpose
This script **automatically goes through multiple Google Search pages** (up to 100 pages by default) and extracts all unique domains.

### How to Use
1. Perform a Google search with your dork (on normal Google search, **not** Images).
2. Open **Developer Tools** → **Console**.
3. Paste the script.
4. Press **Enter**.
5. The script will:
   - Fetch the current page's HTML.
   - Extract all result links (ignoring Google internal links).
   - Follow the “Next Page” link until no more results or until `MAX_PAGES` is reached.
   - Save results to a file `google_search_domains.txt`.

### Parameters You Can Change
Inside the script:
```js
const MAX_PAGES = 100;   
const PAUSE_MS  = 1200;  
```
You can adjust these values to control how many pages to scan and how fast.

---

## Notes & Tips
- The **first script** is great for Google Images or filtered extraction from loaded HTML.
- The **second script** is better for bulk grabbing across multiple Google Search pages.
- Google may temporarily block requests if you scrape too aggressively — increase `PAUSE_MS` if this happens.
- Always scroll down if the page uses lazy loading before running the first script.
- For the second script, no scrolling is needed — it fetches HTML directly.

---

## Troubleshooting
- If the first script returns fewer results than expected, make sure you have loaded all results on the page before running it.
- If the second script stops early, it may be due to Google switching to infinite scroll — in that case, use a scrolling approach instead.
