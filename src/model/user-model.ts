import {DataTypes, Sequelize} from "sequelize";
import generateHash from "../service/generate-hash";
import {passwordValidation, usernameValidation} from "../validation/user-validation";

export const UserModel = (sequelize: Sequelize, type: DataTypes) => {
    const user = sequelize.define(
    'user',
    {
        username: {
            type: type.STRING(44),
            validate: usernameValidation
        },
        password: {
            type: type.STRING,
            validate: passwordValidation
        }
    },
    {
        indexes: [{
            unique: true,
            fields: ['username']
        }]
    });

    user.beforeCreate(generateHash);
    user.beforeUpdate(generateHash);

    return user;
};


