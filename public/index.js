let menuicon = document.querySelector(".menuicon");
let nav = document.querySelector(".nav-container");


// closes nav pane on button click
menuicon.addEventListener("click", ()=> {nav.classList.toggle("navclose")})

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