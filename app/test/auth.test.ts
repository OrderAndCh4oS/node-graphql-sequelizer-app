import * as request from 'supertest';

import app from '../src/app';
import model from "../src/model";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: find out why test passwords aren't hashed

describe('Auth Test Suite', () => {

    beforeAll(async () => {
        // @ts-ignore
        await model.sequelize.sync({force: true});
    });

    afterAll(() => {
        // @ts-ignore
        // model.sequelize.sync({force: true}).then(() => console.log('Cleaned Database.'));
    });

    describe('POST /register - Create a user', () => {

        it('Returns 200 Status and User Data without Password Hash', async () => {
            // Todo: move to mock data provider
            const username = "jane_doe";
            const password = "secret_word";
            const result = await request(app).post('/register')
                .type('json')
                .send(JSON.stringify({
                    username,
                    password
                }))
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.id).toBeDefined();
            expect(result.body.createdAt).toBeDefined();
            expect(result.body.updatedAt).toBeDefined();
            expect(result.body.username).toBeDefined();
            expect(result.body.username).toEqual(username);
            expect(result.body.password).toBeUndefined();
        });
    });

    describe('POST /login - Login a user', () => {

        beforeAll(async () => {
            await model.user.create({username: 'tim', password: 'super_secret'})
        });

        it('Returns 200 Status and User Data without Password Hash', async () => {

            const result = await request(app).post('/login')
                .send({
                    "username": "tim",
                    "password": "super_secret"
                })
                .set('Accept', 'application/json');


            expect(result.statusCode).toBe(200);
            expect(result.body.id).toBeDefined();
            expect(result.body.createdAt).toBeDefined();
            expect(result.body.updatedAt).toBeDefined();
            expect(result.body.username).toBeDefined();
            expect(result.body.username).toEqual('tim');
            expect(result.body.password).toBeUndefined();
        });

        it('Returns 401 Status and Error Message when Auth Fails', async () => {

            const result = await request(app).post('/login')
                .send({
                    "username": "not_tim",
                    "password": "wrong_secret"
                })
                .set('Accept', 'application/json');


            expect(result.statusCode).toBe(401);
            expect(result.body.error).toBeDefined();

        });
    });

});

