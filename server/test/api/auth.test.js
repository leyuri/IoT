const request = require('supertest');
const app = require('../../app');


it('should return 200 for successful registeration', (done) => {
    request(app).post('/api/auth/register')
    .send({email: 'test@test.com', password: 'passpass'})
    .expect(200, done);

})

it('should return token after registeration', (done) => {
    request(app).post('/api/auth/register')
        .send({email: 'test@test.com', password: 'passpass'})
        .then(resp => {
            expect(resp.body.token).toBeTruthy();
            done();
        })
})

it('should return 400 error if email is missing', (done) => {
    request(app).post('/api/auth/register')
        .send({password: 'passpass'})
        .expect(400, done);
})

