export function loginUser(user, agent) {
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