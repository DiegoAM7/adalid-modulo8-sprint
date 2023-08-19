import { ITERACIONES, PORT } from '../configs/constantes.js';
import Skater from '../models/skaters.models.js';
import bcryptjs from 'bcryptjs';

export const getSkater = async (req, res) => {
	const { id } = req.params;

	try {
		const skater = await Skater.findByPk(id);

		if (!skater) {
			return res.status(404).json({
				code: 404,
				message: 'No se encontró el skater',
				skater: null,
			});
		}

		const resultado = {
			...skater.dataValues,
			links: [
				{
					rel: 'self',
					method: 'GET',
					href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
				},
				{
					rel: 'update',
					method: 'PUT',
					href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
				},
				{
					rel: 'delete',
					method: 'DELETE',
					href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
				},
			],
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

export const getSkaters = async (req, res) => {
	try {
		const skaters = await Skater.findAll();
		const resultado = skaters.map((skater) => {
			return {
				...skater.dataValues,
				links: [
					{
						rel: 'self',
						method: 'GET',
						href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
					},
					{
						rel: 'update',
						method: 'PUT',
						href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
					},
					{
						rel: 'delete',
						method: 'DELETE',
						href: `http://localhost:${PORT}/api/skaters/${skater.id}`,
					},
				],
			};
		});

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

		const salt = await bcryptjs.genSalt(ITERACIONES);
		const hashedPassword = await bcryptjs.hash(password, salt);

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
		} = req.body;

		if (
			!email ||
			!nombre ||
			!password ||
			!anos_experiencia ||
			!especialidad
		)
			return {
				code: 400,
				message: 'Faltan datos',
				skater: null,
			};

		const userskater = await Skater.findByPk(id);

		if (!userskater) {
			return {
				code: 404,
				message: 'No existe el skater ',
				skater: null,
			};
		}

		const salt = await bcryptjs.genSalt(ITERACIONES);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const skater = await Skater.update(
			{
				email,
				nombre,
				password: hashedPassword,
				anos_experiencia,
				especialidad,
			},
			{
				where: { id }
			}
		);
		return {
			code: 200,
			message: 'Skater actualizado',
			skater: skater,
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
		const { id } = req.req;

		const skater = await Skater.destroy({
			where: {
				id
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
	getSkater,
	getSkaters,
	createSkater,
	updateSkater,
	deleteSkater
};

export default service;
