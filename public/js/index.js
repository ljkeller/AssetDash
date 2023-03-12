import { setupMenuIcon, setupNav, loadStates, loadAvailibility } from './common.js';

setupNav();
setupMenuIcon();
loadStates();
loadAvailibility();

var redirectToAsset = function(event) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    
    form.method = 'POST';
    form.style.visibility = 'hidden';
    form.action = '/asset/info/';

    const payload = {
        name: event.target.innerText.toLowerCase()
    };
    for (const [key, value] of Object.entries(payload)) {
        var input = document.createElement('input');

        input.name = key;
        input.value = value;

        form.appendChild(input); 
    }

    document.body.appendChild(form);
    form.submit();
}

document.querySelectorAll('.name-tag').forEach(asset => {
    asset.addEventListener('click', redirectToAsset, false);
});