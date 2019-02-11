'use strict';
import {descriptionValidation, titleValidation} from "../../validation/task-validation";

module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define('task', {
        title: {
            type: DataTypes.STRING(60),
            validate: titleValidation,
            allowNull: false,
            defaultValue: '',
        },
        description: {
            type: DataTypes.STRING(255),
            validate: descriptionValidation,
            allowNull: false,
            defaultValue: '',
        }
    }, {
        freezeTableName: true,
    });
    task.associate = function (models) {
        // associations can be defined here
    };
    return task;
};
