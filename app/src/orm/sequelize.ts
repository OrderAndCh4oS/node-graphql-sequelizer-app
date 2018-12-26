import * as Sequelize from 'sequelize';
import {UserModel} from "../model/user-model";

// We define the Sequelize Models

const sequelize = new Sequelize('graphene_js_node_db', 'admin', 'too_secret', {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'db',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 30000,
        acquire: 60000,
    },
});


export const User = UserModel(sequelize, Sequelize);

const sync = () => {
    sequelize.sync()
        .then(() => console.log('Schema built.'))
        .catch(err => {
            console.log(err.name);
            console.log('Retrying in one second...');
            setTimeout(sync, 1000);
        });
};

sync();


