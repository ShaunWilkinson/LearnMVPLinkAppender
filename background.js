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

// Handles opening the options page when a user clicks the extension in the extensions list
chrome.action.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});
  