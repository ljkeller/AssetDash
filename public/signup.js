const form = document.querySelector('.sign-up-box');
form.addEventListener('submit', (event) => {
    // dont let user spam empty boxes
    event.preventDefault();

    let payload = JSON.stringify({
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    });

    (async () => {
        try {
            let res = await fetch('/user/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                body: payload
            });

            if (!res.ok) {throw new Error('Failure to create account: '.concat((await res).status));}

            const jwt = await res.json();
            location.href = '/';
            // TODO: embedd JWT into auth bearer?
        } catch (error) {
            console.error(error)
            alert('Failed to create account');
        }
    })();

    console.log(`Payload: ${payload}`);
});