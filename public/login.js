const form = document.querySelector('.login-box');
form.addEventListener('submit', (event) => {
    // dont let user spam empty boxes
    event.preventDefault();
    
    let payload = JSON.stringify({
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    });

    (async () => {
        try {
            const res = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload
            });

            if (!res.ok) { throw new Error('Failure to login: '.concat(res.status));};
            const jwt = await res.json();
            location.href='/';

            // TODO: embedd JWT into auth bearer?
        } catch (error) {
            console.error(error);
            alert('Failed to login');
        }
    })();
     
    console.log(`Login payload: ${payload}`);
});