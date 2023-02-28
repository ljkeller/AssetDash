const form = document.querySelector('.login-box');
console.log(form);
form.addEventListener('submit', (event) => {
    // dont let user spam empty boxes
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // POST here
    console.log(`email: ${email} pass: ${password}`);
});