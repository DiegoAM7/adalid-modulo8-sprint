import {
    SECRET_PASS,
    ITERACIONES
  } from '../configs/constantes.js';
import Skater from '../models/skaters.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

console.log(SECRET_PASS,ITERACIONES);
export const signUp = async (req, res) => {
	const { email, password } = req.body;
    console.log("========>",password);
	try {
		const foundUser = await Skater.findOne({ where: { email: email } });

		if (!foundUser) {
			return ({
				code: 400,
				message: 'Usuario no encontrado',
			});
		}
		const correctPassword = await bcryptjs.compare(password, foundUser.password);
		if (!correctPassword) {
			return ({
				code: 400,
				message: 'Contraseña incorrecta',
			});
		}

		// generar token
		const payload = { skater: { id: foundUser.id } };

		//firmar el jwt
		const token = jwt.sign(payload, SECRET_PASS, { expiresIn: 3600000 });

		return token;
	} catch (err) {
		console.error(err);
		return ({
			code: err.code || 500,
			message: err.message || 'Ocurrió un error al recuperar los datos.',
		});
	}
}

export const singIn = async (req, res) => {

	const {
		email,
		nombre,
		password,
		anos_experiencia,
		especialidad,
		foto,
		estado,
	} = req.body;
    
	try {
		const salt = await bcryptjs.genSalt(parseInt(ITERACIONES));
		const hashedPassword = await bcryptjs.hash(password, salt);
		console.log(hashedPassword);
		if (
			!email ||
			!nombre ||
			!password ||
			!anos_experiencia ||
			!especialidad ||
			!foto ||
			!estado
		)
			return {
				code: 400,
				message: 'Faltan datos',
				skater: null,
			};

		const skater = await Skater.create({
			email,
			nombre,
			password: hashedPassword,
			anos_experiencia,
			especialidad,
			foto,
			estado,
		});

		console.log(skater);
		return {
			code: 201,
			message: 'Skater creado',
			skater,
		};
	} catch (error) {
		return {
			code: 500,
			message: 'Error al crear el skater',
			skater: null,
		};
	}
}

const service = {
	signUp,
	singIn
};

export default service;