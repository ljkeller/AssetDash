import { loadAvailibility, loadStates, setupMenuIcon, setupNav } from './common.js';

setupNav();
setupMenuIcon();
loadStates();
loadAvailibility();

var reloadWithPost = function(assetName) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    
    form.method = 'POST';
    form.style.visibility = 'hidden';
    form.action = '/asset/info/';

    const payload = {
        name: assetName.toLowerCase()
    };
    for (const [key, value] of Object.entries(payload)) {
        var input = document.createElement('input');

        input.name = key;
        input.value = value;

        form.appendChild(input); 
    }

    document.body.appendChild(form);
    form.submit();
};

const assetUpdate = document.querySelector('.asset-header');
assetUpdate.addEventListener('submit', (event)=>{
    event.preventDefault();

    const assetName = document.getElementById('asset-name').value;
    const payload = JSON.stringify({
        name: assetName,
        availibility: document.getElementById('asset-availibility-inverse').value
    });

    (async () => {
        try {
            
            const res = await fetch('/asset/availibility', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload
            });

            if (!res.ok) { throw new Error('Failure to update asset state: '.concat(res.status));};
            
            reloadWithPost(assetName);
            
        } catch (error) {
            console.error(error);
            alert('Failed to send claim/yield request');
        }
    })();
    
    console.log(payload);

});