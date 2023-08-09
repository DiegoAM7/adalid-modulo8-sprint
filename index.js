import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { engine } from 'express-handlebars';
import { BASE_URL, PORT, SECRET } from './configs/constantes.js';
import db from './configs/db.js';

import skatersRoutes from './routes/skaters.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database
try {
	await db.sync({ force: false });
} catch (error) {
	console.log(error);
}

// Settings
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: 'views/layouts',
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

//Archivos estaticos
app.use(express.static('public'));
app.use('/css', express.static(`${__dirname}/public/assets/css`));
app.use('/js', express.static(`${__dirname}/public/assets/js`));
app.use('/img', express.static(`${__dirname}/public/assets/img`));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', async (req, res) => {
	const data = await fetch(`${BASE_URL}:${PORT}/api/skaters`);
	const { skaters } = await data.json();

	res.render('lista', { skaters });
});

app.get('/registro', (req, res) => {
	res.render('registro');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/skater', (req, res) => {
	// const token = req.headers.authorization.split(' ')[1];
	// const data = token.verify(token, SECRET);

	// const data = await fetch(`${BASE_URL}:${PORT}/api/skaters/${data.id}`)
	// const { skater } = await data.json();

	// res.render('datos', { skater });
	res.render('datos');
});

app.get('/admin', async (req, res) => {
	const data = await fetch(`${BASE_URL}:${PORT}/api/skaters`);
	const { skaters } = await data.json();

	res.render('admin', { skaters });
});

app.use('/api/skaters', skatersRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`Servidor activo en ${BASE_URL}:${PORT}`);
});
