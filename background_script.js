function initializePageAction(tab) {
    chrome.pageAction.setTitle({tabId: tab.id, title: "My IP"});
    chrome.pageAction.show(tab.id);
}

// initialize page acion on each tab update
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

const shivamsTabs = {
  Mywork: {
      name: 'My work',
      urls: []
  },
  Myhome: {
      name: 'My home',
      urls: []
  }
}

//setting default values if no profile found
if(browser && browser.storage) {
  const gettingItem = browser.storage.local.get('shivamsTabs');
  gettingItem.then((res) => {
      if(res.shivamsTabs) return false;
      browser.storage.local.set({ shivamsTabs });
  }).catch(console.log)
}
