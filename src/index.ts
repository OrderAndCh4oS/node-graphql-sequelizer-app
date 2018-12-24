import {config} from 'dotenv';
import routes from './routes';
import express = require('express');
import cookieSession = require('cookie-session');

// Todo: Use docker!!!
// Todo: Watch with Nodemon -exec('ts-node') or something

config();
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(cookieSession({
    name: 'session',
    keys: ["KGUK%EW#o`+z1`gb<@o^3_j!K.W38X?+"],
    httpOnly: true,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.json());

routes(app);