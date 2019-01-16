import * as request from 'supertest';
import model from "../src/model";
import app from "../src/app";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: Some clues here regarding async hang up: https://github.com/visionmedia/supertest/issues/520


describe('Auth Test Suite', () => {

    describe('POST /task - Create a Task', () => {
        const agent = request.agent(app);
        const username = 'timothy';
        const password = 'too_secret';
        const task = {title: "Do this", description: "This needs to be done"};

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        // Todo: make this test reusable
        it('Returns 401 Status if User is not logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/task')
                .send(task)
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(401);
            expect(result.body).toBeDefined();
            expect(result.body.statusCode).toBeDefined();
            expect(result.body.message).toBeDefined();
            expect(result.body.message).toEqual("Auth failed.");
        });

        // Todo: make this test reusable
        it('Should start with signin', async () => {
            // @ts-ignore
            const result = await agent
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
        });

        it('Returns 200 Status and the created task if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/task')
                .send(task)
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body).toBeDefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.description).toBeDefined();
        });
    });

    describe('GET /task - View Task List', () => {
        const agent = request.agent(app);
        const username = 'alex';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        // Todo: make this test reusable
        it('Returns 401 Status if User is not logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(401);
            expect(result.body).toBeDefined();
            expect(result.body.statusCode).toBeDefined();
            expect(result.body.message).toBeDefined();
            expect(result.body.message).toEqual("Auth failed.");
        });

        // Todo: make this test reusable
        it('Should start with signin', async () => {
            // @ts-ignore
            const result = await agent
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
        });

        it('Returns 200 Status and a list of Tasks if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body).toBeDefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.count).toBeDefined();
            expect(result.body.data.rows).toBeDefined();
        });
    });


    describe('GET /task/:id - View Task Detail', () => {
        const agent = request.agent(app);
        const username = 'yanis';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        // Todo: make this test reusable
        it('Returns 401 Status if User is not logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task/1')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(401);
            expect(result.body).toBeDefined();
            expect(result.body.statusCode).toBeDefined();
            expect(result.body.message).toBeDefined();
            expect(result.body.message).toEqual("Auth failed.");
        });

        // Todo: make this test reusable
        it('Should start with signin', async () => {
            // @ts-ignore
            const result = await agent
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
        });

        it('Returns 200 Status and a list of Tasks if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task/1')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body).toBeDefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.userId).toBeDefined();
        });
    });

});

