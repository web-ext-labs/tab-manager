


const mapper = {};
const cardHolder = document.getElementById('cardHolder')
const makePage = profiles => {
    Object.keys(profiles).forEach(key => {
        mapper[key] = profiles[key].urls;
        const card = document.createElement('div');
        card.className = "card";
        card.setAttribute('data-id', key)
        card.textContent = profiles[key].name;
        cardHolder.appendChild(card);
    });
}

// on load
function load() {
    if(browser && browser.storage) {
        const gettingItem = browser.storage.local.get('shivamsTabs');
        gettingItem.then((res) => {
            const profiles = res.shivamsTabs || defaultProfiles;
            makePage(profiles);
        }).catch(console.log)
    }
}
load();

cardHolder.addEventListener('click', e => {
    const card = e;
    if(e.target.nodeName.toLowerCase() !== 'div') return false;
    const key = e.target.getAttribute('data-id');
    if(mapper[key].length === 0) {
        alert('No URLs available for this profile!');
        return false;
    }
    if(browser && browser.tabs) {
        mapper[key].forEach(u => {
            browser.tabs.create({
                url:u
            });
        })
    }
})
