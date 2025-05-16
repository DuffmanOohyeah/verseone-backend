'use strict';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

interface ThingProps {
	[key: string]: string;
}

interface RezProps {
	status: number;
	json: {};
}

const app: Express = express();
const port: string | number = process.env.PORT || 3001;
let thingObj: ThingProps = {};

app.use(compression());

// Middleware to parse JSON
app.use(express.json());

// Define the CORS options
const corsOptions = {
	credentials: true,
	origin: ['http://localhost:3001', 'http://localhost:3000'], // Whitelist the domains you want to allow
};

// Use the cors middleware with your options
app.use(cors(corsOptions));

// Basic route
app.get('/', (req: Request, res: Response): void => {
	res.send('Hello, World!');
});

app.get('/api/confirm', (req: Request, res: Response): void => {
	res.json({ message: 'Yay! Successfully connected to Node.js' });
});

app.post('/post/thing', (req: Request, res: Response): void => {
	const { body } = req;
	let rez: RezProps = { status: 400, json: { error: 'No data provided' } };
	if (body) {
		thingObj[uuidv4()] = body;
		rez = { status: 200, json: thingObj };
	}
	res.status(rez.status).json(rez.json);
});

app.get('/get/things', (req: Request, res: Response): void => {
	res.status(200).json(thingObj);
});

app.get('/get/thing/:id', (req: Request, res: Response): void => {
	const { id } = req.params;
	let rez: RezProps = { status: 400, json: { error: 'Thing not found' } };
	if (id && thingObj[id]) rez = { status: 200, json: thingObj[id] };
	res.status(rez.status).json(rez.json);
});

// Start the server
app.listen(port, (): void => {
	console.log(`VerseOne backend app is running on http://localhost:${port}`);
});
