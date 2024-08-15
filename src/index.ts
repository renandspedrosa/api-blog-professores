import express, { Request, Response } from 'express';
import { config } from "dotenv";

config();
const app = express();


app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

const PORT = parseInt(process.env.PORT_API || '3001');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});