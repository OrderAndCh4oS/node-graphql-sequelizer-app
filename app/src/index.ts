import {config} from 'dotenv';
import routes from './routes';
import express = require('express');
import cookieSession = require("cookie-session");

config();
const app = express();
const port = process.env.PORT || 3001;

app.disable('x-powered-by');

export const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

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