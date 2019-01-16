import {createContext, EXPECTED_OPTIONS_KEY} from 'dataloader-sequelize';

import schema from './graphql/schema';
import * as userController from './controller/user-controller';
import * as taskController from './controller/task-controller';
import * as authenticationController from './controller/authentication-controller';
import * as adminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
import model from "./model";

const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        // @ts-ignore
        context: {[EXPECTED_OPTIONS_KEY]: createContext(model.sequelize)}
    }));
    app.post('/register', userController.register);
    app.post('/login', authenticationController.login);
    app.get('/logout', authenticationController.logout);
    app.get('/admin', authenticateUser, adminController.admin);
    app.post('/task', authenticateUser, taskController.create);
    app.get('/task', authenticateUser, taskController.list);
    app.get('/task/:id', authenticateUser, taskController.detail);
};

export default routes;
