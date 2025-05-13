'use strict';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';

const app: Express = express();
const port: string | number = process.env.PORT || 3001;

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
app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

app.get('/api/confirm', (req: Request, res: Response) => {
	res.json({ message: 'Yay! Successfully connected to Node.js' });
});

// Start the server
app.listen(port, (): void => {
	console.log(`VerseOne backend app is running on http://localhost:${port}`);
});
