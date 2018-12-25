import {schema} from "./schema";
import * as userController from "./controller/user-controller";
const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.send('Jambo World!'));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));
    app.post('/login', userController.login);
    app.post('/register', userController.register);
};

export default routes;