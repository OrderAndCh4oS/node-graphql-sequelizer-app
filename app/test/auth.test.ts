import * as request from 'supertest';

import app from '../src/app';
import sequelize from "../src/orm/sequelize";

describe('POST /register - Create a user', () => {

    afterEach(() => {
        sequelize.sync({force: true}).then(() => console.log('Cleaned Database.'));
    });

    it('Returns 200 status', async () => {
        // Todo: move to mock data provider
        const username = "test_username";
        const password = "password";
        const result = await request(app).post('/register')
            .send({
                "username": username,
                "password": password
            })
            .set('Accept', 'application/json');

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBeDefined();
        expect(result.body.createdAt).toBeDefined();
        expect(result.body.updatedAt).toBeDefined();
        expect(result.body.username).toBeDefined();
        expect(result.body.username).toEqual(username);
        // Todo: Remove password hash from public api to pass this test
        expect(result.body.password).toBeUndefined();
    });
});
