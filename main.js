// Get the form element
const form = document.querySelector('#form');

// Get the input elements
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');

// Add event listener to the form on submit
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (allFieldsValid()) {
        showSuccessMessage();
    }
});


function validateUsername() {
    const username = usernameInput.value.trim();

    if (username === '') {
        showError(usernameInput, 'Username is required');
    } else if (username.length < 5 || username.length > 10) {
        showError(usernameInput, 'Must be between 5 and 10 characters.');
    } else if (!/^[a-z]+$/.test(username)) {
        showError(usernameInput, 'Must contain only lowercase letters.');
    } else {
        showSuccess(usernameInput);
    }
}


function validateEmail() {
    const email = emailInput.value.trim();

    if (email === '') {
        showError(emailInput, 'Email is required.');
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Email is not valid.');
    } else {
        showSuccess(emailInput);
    }
}

function validatePassword() {
    const password = passwordInput.value.trim();

    if (password === '') {
        showError(passwordInput, 'Password is required.');
    } else if (password.length < 8 || password.length > 15) {
        showError(passwordInput, 'Password must be between 8 and 15 characters.');
    } else {
        showSuccess(passwordInput);
    }
}

function validateConfirmPassword() {
    const confirmPassword = confirmPasswordInput.value.trim();
    const password = passwordInput.value.trim();

    if (confirmPassword === '') {
        showError(confirmPasswordInput, 'Confirm Password is required.');
    } else if (confirmPassword !== password) {
        showError(confirmPasswordInput, 'Passwords do not match.');
    } else {
        showSuccess(confirmPasswordInput);
    }
}

function showError(input, message) {
    const parent = input.parentElement;
    const msg = parent.querySelector('.msg');

    parent.classList.remove('success');
    parent.classList.add('error');
    msg.innerText = message;
    msg.style.opacity = '1';
}

// Function to show success message and add success class
function showSuccess(input, message) {
    const parent = input.parentElement;
    const msg = parent.querySelector('.msg');

    parent.classList.remove('error');
    parent.classList.add('success');
    
    msg.innerText = '';
    msg.style.opacity = '1';
}

// Function to validate email using regex
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function allFieldsValid() {
    return (
        usernameInput.parentElement.classList.contains('success') &&
        emailInput.parentElement.classList.contains('success') &&
        passwordInput.parentElement.classList.contains('success') &&
        confirmPasswordInput.parentElement.classList.contains('success')
    );
}

// Function to show success message
function showSuccessMessage() {
    // Create a new element for the success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerText = 'All fields are valid. Form submitted successfully.';

    // Insert the success message above the form
    form.insertAdjacentElement('beforebegin', successMessage);
}