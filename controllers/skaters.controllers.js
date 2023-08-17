import service from '../services/skaters.service.js';

export const getSkaters = async (req, res) => {
	const skaters = await service.getSkaters();

	return res.status(skaters.code).json({
		message: skaters.message,
		skaters: skaters.skaters,
	});
};

export const createSkater = async (req, res) => {
	const skater = await service.createSkater(req, res);

	return res.status(skater.code).json({
		message: skater.message,
		skater: skater.skater,
	});
};

export const updateSkater = async (req, res) => {
	const skater = await service.updateSkater(req, res);

	return res.status(skater.code).json({
		message: skater.message,
		skater: skater.skater,
	});
};

export const deleteSkater = async (req, res) => {
	const skater = await service.deleteSkater(req, res);

	return res.status(skater.code).json({
		message: skater.message,
		skater: skater.skater,
	});
};
