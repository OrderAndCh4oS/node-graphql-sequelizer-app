'use strict';
module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define('task', {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        freezeTableName: true,
    });
    task.associate = function (models) {
        // associations can be defined here
    };
    return task;
};
