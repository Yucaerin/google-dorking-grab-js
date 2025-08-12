(async () => {
  const STORAGE_KEY = "grabbed_domains_google_fetch";
  const MAX_PAGES = 100;           
  const PAUSE_MS  = 1200;          

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const domains = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

  let nextURL = new URL(window.location.href);
  let pages = 0;

  const pushHost = (u) => {
    try {
      const host = new URL(u, location.origin).hostname;
      if (
        host &&
        !host.includes("google.") &&
        !host.includes("gstatic.com") &&
        !host.includes("googleusercontent.com")
      ) domains.add(host);
    } catch (_) {}
  };

  while (true) {
    console.log("[*] Fetching:", nextURL.toString());
    const res  = await fetch(nextURL.toString(), { credentials: "same-origin" });
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    doc.querySelectorAll('a[jsname="UWckNb"], a[jsname="ACyKwe"], div#search a[href^="http"]').forEach(a => {
      const href = a.getAttribute("href") || "";
      if (!href) return;
      if (href.includes("webcache.googleusercontent.com")) return;
      pushHost(href);
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...domains]));

    const nextA = doc.querySelector('a[aria-label="Next page"], a#pnnext');
    if (!nextA) {
      console.log("[*] No more pages.");
      break;
    }

    const href = nextA.getAttribute("href");
    if (!href) break;

    nextURL = new URL(href, location.origin); 
    pages++;
    if (pages >= MAX_PAGES) {
      console.warn("[!] Reached MAX_PAGES.");
      break;
    }
    await sleep(PAUSE_MS);
  }

  const list = [...domains].sort();
  console.log(`[*] Done. Total domains: ${list.length}`);
  console.log(list.join("\n"));

  const blob = new Blob([list.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "google_search_domains.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  localStorage.removeItem(STORAGE_KEY);
})();
