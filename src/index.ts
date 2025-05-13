'use strict';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(compression());

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

// Start the server
app.listen(port, (): void => {
	console.log(`VerseOne backend app is running on http://localhost:${port}`);
});
