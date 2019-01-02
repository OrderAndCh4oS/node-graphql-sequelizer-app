import {schema} from './schema';
import * as userController from './controller/user-controller';
import * as adminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
const passport = require('passport');
const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));
    app.post('/login', passport.authenticate('local'), userController.login);
    app.get('/logout', userController.logout);
    app.post('/register', userController.register);
    app.get('/admin', authenticateUser, adminController.admin);
};

export default routes;