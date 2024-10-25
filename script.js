import CONFIG from './config.js'

const btn = document.getElementById('btn');
btn.addEventListener('click', function(e) {
    e.preventDefault();

    // Full name = fName + lName
    const fName = document.getElementById('fname').value;
    const lName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('msg').value;
    const fullName = fName + " " + lName;
    const errorDisplay = document.createElement('style');

    if (fName == null || fName.length == 0 || lName == null || lName.length == 0 || email == null || email.length == 0 || msg == null || msg.length == 0) {
        alert("Please fill out all of the fields in the contact form.");
        if (fName == null || fName.length == 0) {
            errorDisplay.innerHTML += '#fname::placeholder {color: #cc0000;}';
        }
        if (lName == null || lName.length == 0) {
            errorDisplay.innerHTML += '#lname::placeholder {color: #cc0000;}';
        }
        if (email == null || email.length == 0) {
            errorDisplay.innerHTML += '#email::placeholder {color: #cc0000;}';
        }
        if (msg == null || msg.length == 0) {
            errorDisplay.innerHTML += '#msg::placeholder {color: #cc0000;}';
        }
        document.head.appendChild(errorDisplay);
    } else {
        // Validate Email
        if (validateEmail(email)) {
            // Send Email if its a valid email
            sendEmail(fullName, email, msg);
        } else {
            alert("Failed to send message. Invalid Email.");
        }
    }
})

function sendEmail(fullName, email, msg) {
    const emailBody = 'Full Name: ' + fullName + '<br/> E-mail: ' + email + '<br/> Message: ' + msg;
    Email.send({
        SecureToken : CONFIG.EMAIL_API,
        To : CONFIG.RECEIVER,
        From : CONFIG.SENDER,
        Subject : "Portfolio Contact Message",
        Body : emailBody
    }).then(
      message => alert(message)
    );
}

const validateEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
};
