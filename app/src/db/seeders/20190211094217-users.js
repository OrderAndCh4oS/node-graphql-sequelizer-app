'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user', [
            {
                username: 'desmond',
                password: 'too_secret',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'eric',
                password: 'too_secret',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'donna',
                password: 'too_secret',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'tilda',
                password: 'too_secret',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user', null, {});
    },
};
