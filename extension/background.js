chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log("Visited:", changeInfo.url);

        fetch("http://127.0.0.1:8000/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: changeInfo.url })
        }).catch(err => {
            console.error("Failed to send URL:", err);
        });
    }
});


