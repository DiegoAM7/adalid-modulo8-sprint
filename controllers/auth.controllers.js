import e from 'express';
import service from '../services/auth.service.js';

export const signUp = async (req, res) => {
	console.log('SIGNUP - req', req);
	const {
		email,
		nombre,
		password,
		repassword,
		aniosExperiencia,
		especialidad,
		fotoPerfil,
	} = req.body;

	const skater = await service.signUp(
		email,
		nombre,
		password,
		repassword,
		aniosExperiencia,
		especialidad,
		fotoPerfil
	);

	return res.status(skater.code).json({
		message: skater.message,
		skater: skater.skater,
	});
};

export const signIn = async (req, res) => {
	const skater = await service.signIn(req, res);

	if (skater.token !== null) {
		res.header('Authorization', `Bearer ${skater.token}`);
	}

	return res.status(skater.code).json({
		message: skater.message,
		token: skater.token,
	});
};
