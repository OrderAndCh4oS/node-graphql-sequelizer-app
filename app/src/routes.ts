import schema from './graphql/schema';
import * as userController from './controller/user-controller';
import * as authenticationController from './controller/authentication-controller';
import * as adminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";

const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));
    app.post('/register', userController.register);
    app.post('/login', authenticationController.login);
    app.get('/logout', authenticationController.logout);
    app.get('/admin', authenticateUser, adminController.admin);
};

export default routes;
