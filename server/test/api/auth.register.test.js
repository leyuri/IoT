const request = require('supertest');
const app = require('../../app');
const db = require('../../models')
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

// db user 데이터 초기화
beforeAll(() => {
});
  
afterEach(async (done) => {
    await db.User.destroy({ truncate: true, cascade: true });
    done();
});



it('should return 200 for successful registeration', (done) => {
    request(app).post('/api/auth/register')
    .send({email: 'test@test.com', password: 'passpass'})
    .expect(200, done);

})

it('should return token after registeration', async (done) => {
    const resp = await request(app)
        .post('/api/auth/register')
        .send({email: 'test@test.com', password: 'passpass'})
    expect(resp.body.token).toBeTruthy();

    expect(() => {
        jwt.verify(resp.body.token, config.secret);
    }).not.toThrow();
    done();

})

// 동일한 이메일이 있을 경우 400 에러가 넘어오도록 한다
it('should return 400 if there is the same email', async (done) => {
    await db.User.create({
      email: 'test@test.com', password: 'test'  });
    request(app).post('/api/auth/register')
      .send({ email: 'test@test.com', password: 'passpass' })
      .expect(400)
      .then(resp => {
        expect(resp.body.message).toBe('email is taken');
        done();
      });
  });

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
    console.log(resp.body);
    user = await db.User.findOne({ where: { email: 'test@test.com' } });
    expect(user).not.toBeNull();
    done();
  });





