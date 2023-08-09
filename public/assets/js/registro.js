const form_regisro = document.querySelector('#form_regisro');
const emailInput = document.querySelector('#email');
const nombreInput = document.querySelector('#nombre');
const passwordInput = document.querySelector('#password');
const rePasswordInput = document.querySelector('#repassword');
const aniosExperienciaInput = document.querySelector('#aniosExperiencia');
const especialidadInput = document.querySelector('#especialidad');
const fotoPerfilInput = document.querySelector('#fotoPerfiln');

form_regisro.addEventListener('submit', async (e) => {
	e.preventDefault();

	const emailValue = emailInput.value;
	const nombreValue = nombreInput.value;
	const passwordValue = passwordInput.value;
	const rePasswordValue = rePasswordInput.value;
	const aniosExperienciaValue = aniosExperienciaInput.value;
	const especialidadValue = especialidadInput.value;
	const fotoPerfilValue = fotoPerfilInput;

	const result = validaciones(
		emailValue,
		nombreValue,
		passwordValue,
		rePasswordValue,
		aniosExperienciaValue,
		especialidadValue,
		fotoPerfilValue
	);

	if (result === true) {
		const formData = new FormData();
		formData.append('email', emailValue);
		formData.append('nombre', nombreValue);
		formData.append('password', passwordValue);
		formData.append('repassword', rePasswordValue);
		formData.append('aniosExperiencia', aniosExperienciaValue);
		formData.append('especialidad', especialidadValue);
		formData.append('fotoPerfil', fotoPerfilValue);

		try {
			const response = await fetch(`/api/auth/registro`, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log('REGISTRO.JS - response', response);
		} catch (error) {
			console.log('REGISTRO.JS - error', error);
		}
	}
});

// Función para validar el formato de email
const isValidEmail = (email) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};
//Función addError.
const addError = (input, message) => {
	const inputControl = input.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	errorDisplay.innerText = message;
	inputControl.classList.add('error');
	inputControl.classList.remove('success');
	input.classList.add('is-invalid');
	input.classList.remove('is-valid');
};
//Función removeError.
const removeError = (input) => {
	const inputControl = input.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	errorDisplay.innerText = '';
	inputControl.classList.add('success');
	inputControl.classList.remove('error');
	input.classList.add('is-valid');
	input.classList.remove('is-invalid');
};

const validaciones = (
	email,
	nombre,
	password,
	repitaPassword,
	aniosExperiencia,
	especialidad,
	fotoPerfil
) => {
	let isValid = true;

	if (!email) {
		addError(emailInput, 'Email requerido.');
		isValid = false;
	} else if (!isValidEmail(email)) {
		addError(emailInput, 'Email no válido.');
		isValid = false;
	} else {
		removeError(emailInput);
	}

	if (!nombre) {
		addError(nombreInput, 'Nombre requerido.');
		isValid = false;
	} else {
		removeError(nombreInput);
	}

	if (!password) {
		addError(passwordInput, 'Contraseña requerida.');
		isValid = false;
	} else if (password.length < 6) {
		addError(passwordInput, 'Contraseña debe tener al menos 6 caracteres.');
		isValid = false;
	} else {
		removeError(passwordInput);
	}

	if (!repitaPassword) {
		addError(rePasswordInput, 'Repite la contraseña.');
		isValid = false;
	} else if (password !== repitaPassword) {
		addError(rePasswordInput, 'Contraseñas no coinciden.');
		isValid = false;
	} else {
		removeError(rePasswordInput);
	}

	if (!aniosExperiencia) {
		addError(aniosExperienciaInput, 'Ingresa años de experiencia.');
		isValid = false;
	} else if (isNaN(aniosExperiencia)) {
		addError(aniosExperienciaInput, 'Años de experiencia debe ser un número.');
		isValid = false;
	} else {
		removeError(aniosExperienciaInput);
	}

	if (!especialidad) {
		addError(especialidadInput, 'Ingresa una especialidad.');
		isValid = false;
	} else {
		removeError(especialidadInput);
	}

	// Validación de foto de perfil
	// if (!fotoPerfil) {
	//     addError(fotoPerfilInput, "Selecciona una foto de perfil.");
	// } else {
	//     removeError(fotoPerfilInput);
	// }
	return isValid;
};
