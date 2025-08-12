# Google Image Domain Extractor

This JavaScript script is designed to **extract unique domains** from Google Images search results based on a specific keyword or dork.  
It’s useful when searching for a particular file path in Google Images and you want to quickly extract all the domains found.

---

## Features
- **Filter URLs** by a specific path (e.g., `/wp-content/uploads/`).
- **Extract unique domains only** (no duplicates).
- **Automatically download** the results to a `domain_list.txt` file.
- Can be run directly in the **browser console** (Chrome, Firefox, Edge, etc.).

---

## How to Use

1. **Open Google Images**  
   Go to [https://images.google.com](https://images.google.com).

2. **Search with your dork**  
   Example:
   ```
   "/wp-content/uploads/"
   ```

3. **Scroll the page**  
   Scroll down to load as many search results as possible.

4. **Open Developer Tools**  
   - Press `F12` or right-click → **Inspect** → go to the **Console** tab.

5. **Paste the Script**  
   - Copy the entire JavaScript script provided.
   - Paste it into the console.
   - Press **Enter**.
   - [***NB***] b4 paste, edit the **Subfiltering** bit to fit your dork.

6. **Automatic Download**  
   - The script will:
     - Collect all URLs containing your filter path.
     - Extract unique domains.
     - Automatically download them as `domain_list.txt`.

---

## Example Output
If the search results contain:
```
https://example.com/wp-content/uploads/11/2024/logo.png
https://testsite.org/wp-content/uploads/12/2022/banner.jpg
https://example.com/wp-content/uploads/photo.jpg
```

The `domain_list.txt` will contain:
```
example.com
testsite.org
```

---

## Notes
- Make sure to adjust the `filterSubstring` variable in the script to match the path you are looking for.
- Only URLs containing that substring will be extracted.
- If you want to extract all URLs without filtering by path, leave `filterSubstring` empty.
