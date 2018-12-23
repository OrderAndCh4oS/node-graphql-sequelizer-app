import * as Sequelize from 'sequelize';
import {UserModel} from "../model/user-model";

// We define the Sequelize Models
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
});

export const User = UserModel(sequelize, Sequelize);

sequelize.sync()
    .then(() => console.log('Schema built.'))
    .catch(err => console.log(err));
