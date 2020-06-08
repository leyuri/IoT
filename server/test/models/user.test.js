const db = require('../../models');

afterEach(async (done) => {
    await db.User.destroy({ truncate: true, cascade: true })
    done();
  });


it('should encode password after creating', async (done) => {
    const user = await db.User.create({
      email: '1@com', password: 'password'
    });
    // 암호화가 되었으니까 password와 다르기를 기대하는 것
    expect(user.password).not.toBe('password');
    expect(user.validatePassword('password')).toBe(true);
    expect(user.validatePassword('password1')).toBe(false);
    done();
});