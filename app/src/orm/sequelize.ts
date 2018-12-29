import * as Sequelize from 'sequelize';
import {UserModel} from '../model/user-model';
import * as mysql from '../constants/mysql';

const sequelize = new Sequelize(
    mysql.DATABASE, mysql.USER, mysql.PASSWORD,
    {
        dialect: 'mysql',
        host: mysql.HOST,
        port: mysql.PORT,
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

export default sequelize;
