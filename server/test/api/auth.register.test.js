const request = require('supertest');
const app = require('../../app');
const db = require('../../models')


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
});

it('should return 400 error if password is missing', (done) => {
    request(app).post('/api/auth/register')
        .send({email: 'passpass'})
        .expect(400, done);
});

// 테스트가 항상 빨간색이 되어야 하는 것을 확인해야 함!
it('should make a new user after registration', async (done) => {
    let user = await db.User.findOne({ where: { email: 'test@test.com'}});
    expect(user).toBeNull();
    const resp = await request(app).post('/api/auth/register')
      .send({ email: 'test@test.com', password: 'passpass' });
    user = await db.User.findOne({ where: { email: 'test@test.com' } });
    expect(user).not.toBeNull();
    done();
  });





