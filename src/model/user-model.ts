import {DataTypes, Sequelize} from "sequelize";
import {passwordHash, verifyPassword} from "../service/password-hash";
export const UserModel = (sequelize: Sequelize, type: DataTypes) => {
    const User = sequelize.define(
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

    // @ts-ignore
    User.prototype.validPassword = verifyPassword;
    User.beforeCreate(passwordHash);
    User.beforeUpdate(passwordHash);

    return User;
};

import {passwordValidation, usernameValidation} from "../validation/user-validation";


