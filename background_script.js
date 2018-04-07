function initializePageAction(tab) {
    chrome.pageAction.setTitle({tabId: tab.id, title: "My IP"});
    chrome.pageAction.show(tab.id);
}

// initialize page acion on each tab update
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

// browser.runtime.onMessage.addListener(req => {
//     const gettingItem = browser.storage.local.get('shivamsTabs');
//         gettingItem.then((res) => {
//             const profiles = res.shivamsTabs || [];
//             profiles.forEach(profile => {
//                 const li = document.createElement('li');
//                 li.textContent = profile;
//                 document.getElementById('profileHolder').appendChild(li)
//             })
            
//         })
// });