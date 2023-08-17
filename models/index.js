import { Sequelize } from 'sequelize';
import db from '../configs/db.js';
import Skater from './skaters.models.js';

const database = {};

database.Sequelize = Sequelize;
database.sequelize = db;

database.skaters = Skater(db, Sequelize);

export default database;
