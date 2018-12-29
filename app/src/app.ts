import {config} from 'dotenv';
import routes from './routes';
import express = require('express');
import cookieSession = require("cookie-session");

// Todo: Separate Server and App: https://stackoverflow.com/a/53712305/2562137

config();
const app = express();

app.disable('x-powered-by');

app.use(cookieSession({
    name: 'session',
    keys: ["KGUK%EW#o`+z1`gb<@o^3_j!K.W38X?+"],
    httpOnly: true,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.json());

routes(app);

export default app;
