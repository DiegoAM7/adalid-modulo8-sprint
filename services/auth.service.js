import { SECRET } from '../configs/constantes.js';
import Skater from '../models/skaters.models.js';
import jwt from 'jsonwebtoken';

export const signUp = async (
	email,
	nombre,
	password,
	repassword,
	aniosExperiencia,
	especialidad,
	fotoPerfil
) => {
	if (password !== repassword) {
		return {
			code: 400,
			message: 'Las contraseñas no coinciden',
			skater: null,
		};
	}

	try {
		const skater = await Skater.create({
			email,
			nombre,
			password,
			anos_experiencia: aniosExperiencia,
			especialidad,
			foto: fotoPerfil,
		});

		return {
			code: 201,
			message: 'Usuario creado',
			skater,
		};
	} catch (err) {
		return {
			code: 500,
			message: 'Error al crear el usuario',
			skater: null,
		};
	}
};

export const signIn = async (email, password) => {
	try {
		const skater = await Skater.findOne({
			where: {
				email,
			},
		});

		if (!skater) {
			return {
				code: 404,
				message: 'Usuario no encontrado',
				token: null,
			};
		}

		if (skater.password !== password) {
			return {
				code: 400,
				message: 'Contraseña incorrecta',
				token: null,
			};
		}

		const payload = { user: { skaterId: skater.id } };
		const token = jwt.sign(payload, SECRET, { expiresIn: '8h' });

		return {
			code: 200,
			message: 'Inicio de sesión exitoso',
			token,
		};
	} catch (err) {
		return {
			code: 500,
			message: 'Error al iniciar sesión',
			token: null,
		};
	}
};

const service = {
	signUp,
	signIn,
};

export default service;
