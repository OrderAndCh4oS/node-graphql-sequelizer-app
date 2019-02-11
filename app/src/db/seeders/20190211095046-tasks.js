'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        // Todo: add seeders for tasks with users associated.
        return queryInterface.bulkInsert('task', [
            {},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('task', null, {});
    },
};
