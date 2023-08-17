import { DataTypes } from 'sequelize';
import db from '../configs/db.js';

const Skater = db.define(
	'skater',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		anos_experiencia: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		especialidad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		foto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		estado: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		modelName: 'skaters',
	}
);

export default Skater;
