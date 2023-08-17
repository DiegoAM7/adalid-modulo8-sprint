import {
	DB_NAME,
	DB_USER,
	DB_PASS,
	DB_HOST,
	DB_DIALECT,
} from './constantes.js';
import { Sequelize } from 'sequelize';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	host: DB_HOST,
	dialect: DB_DIALECT,
});

export default db;
