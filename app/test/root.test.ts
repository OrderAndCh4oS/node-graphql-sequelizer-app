import * as request from 'supertest';

import app from "../src/app";

describe('GET / - a root api endpoint', () => {
    it('Returns 200 status', async () => {
        const result = await request(app).get('/');
        expect(result.statusCode).toEqual(200);
    });
});