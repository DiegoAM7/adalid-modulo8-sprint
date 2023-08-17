const form_login = document.querySelector('#form_login');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form_login.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const result = validaciones(
        emailValue,
        passwordValue
    );

    if (result === true) {
        const registro = {
            email: `${emailValue}`,
            password: `${emailValue}`
        }

        try {
            const response = await fetch('http://localhost:3001/api/skaters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registro)
            });
            if (response.ok) {
                const jsonresponse = await response.json();
                console.log(jsonresponse);
            }


        } catch (error) {
            console.log(error);
        }
    }
});

// Función para validar el formato de email
const isValidEmail =(email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
//Función addError.
const addError = (input , message)=>{
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
}
//Función removeError.
const removeError = (input)=>{
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')
}

const validaciones = (email,password) => {

    let isValid = true;

    if (!email) {
        addError(emailInput, "Email requerido.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        addError(emailInput, "Email no válido.");
        isValid = false;
    } else {
        removeError(emailInput);
    }

    if (!password) {
        addError(passwordInput, "Contraseña requerida.");
        isValid = false;
    } else if (password.length < 6) {
        addError(passwordInput, "Contraseña debe tener al menos 6 caracteres.");
        isValid = false;
    } else {
        removeError(passwordInput);
    }

    return isValid;
}