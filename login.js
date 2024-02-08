function checkPassword() {
    var inputPassword = document.getElementById('password').value;
    var hashedInput = CryptoJS.SHA256(inputPassword).toString();

    var actualPasswordHash = '5ebac058d2c2204ebd554e965426e4dca6f6ae5be5b65d6aa5623b31026190fb';

    if (hashedInput === actualPasswordHash) {
        // Redirect to the main page if the password is correct
        window.location.href = 'main.html';
    } else {
        alert('Incorrect password');
    }
}

