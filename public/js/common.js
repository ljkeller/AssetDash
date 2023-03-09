function setupNav() {
    const dashboard_nav = document.querySelector('.dashboard');
    const assets_nav = document.querySelector('.assets');
    const chat_nav = document.querySelector('.chat');
    const groups_nav = document.querySelector('.groups');
    const profile_nav = document.querySelector('.profile');
    const settings_nav = document.querySelector('.settings');
    const logout_nav = document.querySelector('.logout');

    dashboard_nav.addEventListener('click', () => { location.href = '/dashboard'; });
    assets_nav.addEventListener('click', () => { location.href = '/asset'; });
    logout_nav.addEventListener('click', () => { location.href = '/login'; });

    // TODO
    chat_nav.addEventListener('click', () => { alert('Unimplemented nav!') });
    groups_nav.addEventListener('click', () => { alert('Unimplemented nav!') });
    profile_nav.addEventListener('click', () => { alert('Unimplemented nav!') });
    settings_nav.addEventListener('click', () => { alert('Unimplemented nav!') });
    
    // TODO: Nav with JWT?
}

function setupMenuIcon() {
    const menuicon = document.querySelector(".menuicon");
    const nav = document.querySelector(".nav-container");
    menuicon.addEventListener("click", ()=> {nav.classList.toggle("navclose")});
}

function loadStates() {
    const stateCollection = document.getElementsByClassName("state-tag");
    for (let element of stateCollection) {
        const state = element.textContent;
        if (state && state.toLowerCase() === "off") {
            element.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--tertiary-color');
        } else if (state && state.toLowerCase() === "maintenance") {
            element.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--secondary-color-tetr1');
        } else {
            element.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--healthy-color');
        }
    }
}

function loadAvailibility() {
    const availibilityCollection = document.getElementsByClassName("availibility-tag");
    for (let element of availibilityCollection) {
        const availibility = element.textContent;
        if (availibility && availibility.toLowerCase() === "claimed") {
            element.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--secondary-color-tetr1');
        } else {
            element.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--healthy-color');
        }
    }
}

export { setupNav, setupMenuIcon, loadStates, loadAvailibility };