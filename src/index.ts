import { config } from 'dotenv';
import routes from './routes';
import express = require('express');

// Todo: Use docker!!!
// Todo: Watch with Nodemon -exec('ts-node') or something

config();
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.json());

routes(app);