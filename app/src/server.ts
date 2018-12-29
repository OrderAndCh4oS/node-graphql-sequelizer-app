import app from "./app";
import {port} from './constants/server';

export const server = app.listen(port, () => console.log(`App listening on port ${port}!`));
