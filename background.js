const RULE_ID = 1;

async function updateRedirectRule() {
  const { mvpId } = await chrome.storage.sync.get({ mvpId: "notConfigured" });

  const redirectRule = {
    id: RULE_ID,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "wt.mc_id", value: mvpId }
            ]
          }
        }
      }
    },
    condition: {
      urlFilter: "||learn.microsoft.com/",
      resourceTypes: ["main_frame"]
    }
  };

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [redirectRule]
  });
}

// Set on install/startup
chrome.runtime.onInstalled.addListener(updateRedirectRule);
chrome.runtime.onStartup.addListener(updateRedirectRule);

// Re-apply rule when ID changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.mvpId) {
    updateRedirectRule();
  }
});

// Generate a copied link on click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url || !tab.id) return;

  const { mvpId } = await chrome.storage.sync.get({ mvpId: "notConfigured" });

  try {
    const url = new URL(tab.url);

    if (url.hostname === "learn.microsoft.com") {
      // Remove locale prefix (e.g., /en-us/)
      url.pathname = url.pathname.replace(/^\/[a-z]{2}-[a-z]{2}/, "");

      // Add or update wt.mc_id
      url.searchParams.set("wt.mc_id", mvpId);

      const shareUrl = url.toString();

      // Send message to content script to copy URL
      chrome.tabs.sendMessage(tab.id, { type: "copy_mvp_url", url: shareUrl }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("Content script not ready. Try refreshing the tab first.");
        }
      });
    } else {
      chrome.runtime.openOptionsPage(); // Not on Learn site
    }
  } catch (err) {
    console.error("URL handling error:", err);
  }
});


