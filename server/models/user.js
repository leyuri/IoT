'use strict';

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      // password를 집어넣을 때 암호화를 해서 password를 save하게 될 것
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  // tojson 이라는 것을 주면 바꿀 때 어떠한 정보를 담을 것인지 고를 수 있다. 
  // 카피를 해서 변경
  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};