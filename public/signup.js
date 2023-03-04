const form = document.querySelector('.sign-up-box');
console.log(form);
form.addEventListener('submit', (event) => {
    // dont let user spam empty boxes
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // POST here
    console.log(`username: ${username} email: ${email} pass: ${password}`);
});