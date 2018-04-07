const newProfile = document.getElementById('newProfile');
const profileHolder = document.getElementById('profileHolder');

// adding new profile
newProfile.addEventListener('keyup', (e)=> {
    if( e.keyCode !== 13) return false;
    const li = document.createElement('li');
    const value = e.target.value
    li.textContent = value;
    if(browser && browser.storage) {
        const gettingItem = browser.storage.local.get('shivamsTabs'); 
        gettingItem.then((res) => {
            const profiles = res.shivamsTabs || {};
            const key = value.replace(/^\s+|\s+$/g, '');
            profiles[key] = {
                name: value,
                urls: []
            }
            browser.storage.local.set({ shivamsTabs: profiles });
            profileHolder.appendChild(li);
            newProfile.value = "";
        })
    }
})

// on popup load
function load() {
    if(browser && browser.storage) {
        const gettingItem = browser.storage.local.get('shivamsTabs');
        gettingItem.then((res) => {
            const profiles = res.shivamsTabs || {};
            Object.keys(profiles).forEach(key => {
                const li = document.createElement('li');
                li.textContent = profiles[key].name;
                document.getElementById('profileHolder').appendChild(li)
            })
        }).catch(console.log)
    }
}
load();

// adding url to profile
profileHolder.addEventListener('click', e => {
    const profileName = e.target.textContent;
    if(browser && browser.storage) {
        const gettingItem = browser.storage.local.get('shivamsTabs');
        gettingItem.then((res) => {
            const profiles = res.shivamsTabs || {};
            const key = profileName.replace(/^\s+|\s+$/g, '');
            const urls = profiles[key].urls || [];
            // to get current URL
            var querying = browser.tabs.query({currentWindow: true, active: true});
            querying.then(tabs => {
                urls.push(tabs[0].url);
                profiles[key].urls = urls;
                browser.storage.local.set({ shivamsTabs: profiles });
            });
        }).catch(console.log)
    }
})

