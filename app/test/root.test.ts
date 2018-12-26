import * as request from 'supertest';
import app, {server} from "../src";

describe('GET / - a root api endpoint', () => {
    afterAll(() => {
        return server.close();
    });

    it('Returns 200 status', async () => {
        const result = await request(app).get('/');
        expect(result.statusCode).toEqual(200);
    });
});