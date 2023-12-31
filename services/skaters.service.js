import Skater from '../models/skaters.models.js';

export const getSkaters = async (req, res) => {
	try {
		const skaters = await Skater.findAll();
		const resultado = skaters.map((skater) => skater.dataValues);

		if (!skaters)
			return {
				code: 404,
				message: 'No se encontraron skaters',
				skaters: [],
			};

		return {
			code: 200,
			message: 'Listado de skaters',
			skaters: resultado,
		};
	} catch (error) {
		console.log(error);
		return {
			code: 500,
			message: 'Error al obtener los skaters',
			skaters: [],
		};
	}
};

export const createSkater = async (req, res) => {
	try {
		const {
			email,
			nombre,
			password,
			anos_experiencia,
			especialidad,
			foto,
			estado,
		} = req.body;

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
			password,
			anos_experiencia,
			especialidad,
			foto,
			estado,
		});

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
};

export const updateSkater = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			email,
			nombre,
			password,
			anos_experiencia,
			especialidad,
			foto,
			estado,
		} = req.body;

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

		const skater = await Skater.update(
			{
				email,
				nombre,
				password,
				anos_experiencia,
				especialidad,
				foto,
				estado,
			},
			{
				where: {
					id,
				},
			}
		);

		return {
			code: 200,
			message: 'Skater actualizado',
			skater,
		};
	} catch (error) {
		return {
			code: 500,
			message: 'Error al actualizar el skater',
			skater: null,
		};
	}
};

export const deleteSkater = async (req, res) => {
	try {
		const { id } = req.params;

		const skater = await Skater.destroy({
			where: {
				id,
			},
		});

		return {
			code: 200,
			message: 'Skater eliminado',
			skater,
		};
	} catch (error) {
		return {
			code: 500,
			message: 'Error al eliminar el skater',
			skater: null,
		};
	}
};

const service = {
	getSkaters,
	createSkater,
	updateSkater,
	deleteSkater,
};

export default service;
