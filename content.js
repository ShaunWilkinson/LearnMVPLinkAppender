  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "copy_mvp_url" && message.url) {
      try {
        await navigator.clipboard.writeText(message.url);
        alert("MVP share URL copied to clipboard!");
        sendResponse({ success: true });
      } catch (err) {
        console.error("Failed to copy URL to clipboard:", err);
        alert("Failed to copy MVP link.");
        sendResponse({ success: false });
      }
    }
    return true; // Indicates async response
  });
  