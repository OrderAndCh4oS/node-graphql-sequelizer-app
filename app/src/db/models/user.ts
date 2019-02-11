import {passwordHash, verifyPassword} from "../../service/password-utilities";
import {passwordValidation, usernameValidation} from "../../validation/user-validation";

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user',
        {
            username: {
                type: DataTypes.STRING(44),
                validate: usernameValidation,
                allowNull: false,
                defaultValue: '',
            },
            password: {
                type: DataTypes.STRING,
                validate: passwordValidation,
                allowNull: false,
                defaultValue: '',
            }
        },
        {
            freezeTableName: true,

            indexes: [{
                unique: true,
                fields: ['username']
            }],
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                withPassword: {
                    attributes: {},
                }
            }
        });
    user.associate = function (models) {
        user.hasMany(models.task, {as: 'tasks'});
    };

    user.prototype.validPassword = verifyPassword;
    user.beforeCreate(passwordHash);
    user.beforeUpdate(passwordHash);

    return user;
};
