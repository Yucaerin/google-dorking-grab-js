(function() {
    // === Subfiltering Is a example ===
    var filterSubstring = "/wp-content/uploads/";

    var pageSource = document.documentElement.outerHTML;

    var urlRegex = /https?:\/\/[^\s"'>]+/gi;
    var allUrls = pageSource.match(urlRegex) || [];

    function containsSubstring(url, substring) {
        return url.toLowerCase().includes(substring.toLowerCase());
    }

    function getDomain(url) {
        try {
            return new URL(url).hostname;
        } catch (e) {
            return null;
        }
    }

    var filteredUrls = allUrls.filter(url => containsSubstring(url, filterSubstring));

    var uniqueDomains = Array.from(new Set(filteredUrls.map(getDomain).filter(Boolean)));

    if (uniqueDomains.length > 0) {
        console.log("The domain:", uniqueDomains.length);
        console.log(uniqueDomains.join("\n"));

        var blob = new Blob([uniqueDomains.join("\n")], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "domain_list.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.log("No domain.");
    }
})();
