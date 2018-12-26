import * as request from 'supertest';
import app, {server} from '../src';

describe('POST /register - Create a user', () => {
    afterAll(() => {
        return server.close();
    });

    it('Returns 200 status', async () => {
        const result = await request(app).post('/register')
            .send({
                "username": "john-boy",
                "password": "password"
            })
            .set('Accept', 'application/json');
        expect(result.statusCode).toEqual(200);
    });
});
