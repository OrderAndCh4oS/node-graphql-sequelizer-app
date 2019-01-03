import * as request from 'supertest';

import app from '../src/app';
import model from "../src/model";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

function loginUser(user, agent) {
    return function (done) {
        agent
            .post('/login')
            .send(user)
            .end((error, result) => {
                expect(result.statusCode).toBe(200);
                return done();
            });
    };
}

describe('Auth Test Suite', () => {
    beforeAll(async () => {
        // @ts-ignore
        await model.sequelize.sync({force: true});
    });

    afterAll(async () => {
        // @ts-ignore
        await model.sequelize.sync({force: true});
    });

    describe('POST /register - Create a user', () => {
        it('Returns 200 Status and User Data without Password Hash', async () => {
            // Todo: move to mock data provider
            const username = "jane_doe";
            const password = "secret_word";
            const result = await request(app)
                .post('/register')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.data).toBeDefined();
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.createdAt).toBeDefined();
            expect(result.body.data.updatedAt).toBeDefined();
            expect(result.body.data.username).toBeDefined();
            expect(result.body.data.username).toEqual(username);
            expect(result.body.data.password).toBeUndefined();
        });
    });

    describe('POST /login - Login a user', () => {

        const username = 'jimbo';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 200 Status and User Data without Password Hash', async () => {
            const result = await request(app)
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            // Todo: Check for cookie details
            // Todo: Look into SuperAgent auth testing

            expect(result.statusCode).toBe(200);
            expect(result.body.data).toBeDefined();
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.createdAt).toBeDefined();
            expect(result.body.data.updatedAt).toBeDefined();
            expect(result.body.data.username).toBeDefined();
            expect(result.body.data.username).toEqual(username);
            expect(result.body.data.password).toBeUndefined();
        });

        it('Returns 401 Status and Error Message when Username is found but Password is Invalid', async () => {
            const result = await request(app)
                .post('/login')
                .send({
                    username: "jimbo",
                    password: "wrong_secret"
                })
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(401);
            // expect(result.body.error).toBeDefined();
        });

        it('Returns 401 Status and Error Message when Username and Password are Invalid', async () => {
            const result = await request(app)
                .post('/login')
                .send({
                    username: "not_jimbo",
                    password: "wrong_secret"
                })
                .set('Accept', 'application/json');


            expect(result.statusCode).toBe(401);
            // expect(result.body.message).toBeDefined();
        });

        it('Returns 400 Status and Error Message when No Data is Provided', async () => {
            const result = await request(app).post('/login')
                .send({})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(400);
            // expect(result.body.message).toBeDefined();
        });
    });

    describe('GET /logout - Logout a user', () => {
        const agent = request.agent(app);

        const username = 'micheal';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 200 Status and Message if User is not logged in', async () => {
            const result = await request(app)
                .get('/logout')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.message).toEqual('Logged out');
        });

        it('Should start with signin', loginUser({username, password}, agent));

        it('Returns 200 Status and Message if User was logged in', () => {
            agent
                .get('/logout')
                .set('Accept', 'application/json')
                .end((err, result) => {
                    expect(result.statusCode).toBe(200);
                    expect(result.body.message).toEqual('Logged out');
                });
        });

    });

    describe('GET /admin - Access admin area', () => {
        const agent = request.agent(app);

        const username = 'jenny';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 401 Status if User is not logged in', (done) => {
            agent
                .get('/admin')
                .set('Accept', 'application/json')
                .end((error, result) => {
                    expect(result.statusCode).toBe(401);
                    expect(result.body).toBeDefined();
                    expect(result.body.error).toBeDefined();
                    expect(result.body.message).toBeDefined();
                    expect(result.body.message).toEqual("Auth failed.");
                    return done()
                });
        });

        it('Should start with signin', loginUser({username, password}, agent));

        it('Returns 200 Status and a Message with the users name if User is logged in', (done) => {
            agent
                .get('/admin')
                .set('Accept', 'application/json')
                .end((error, result) => {
                    expect(result.statusCode).toBe(200);
                    expect(result.body).toBeDefined();
                    expect(result.body.message).toBeDefined();
                    expect(result.body.message).toEqual("jenny is logged in");
                    return done()
                });
        });
    });
});

