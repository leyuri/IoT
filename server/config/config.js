const JWT_KEY = "secret-key-test";

module.exports = {
    JWT_KEY: process.env.JWT_KEY || JWT_KEY,
};

// 밖에서는 내 토큰을 모르도록 환경변수에서 받아서 사용하도록 할 것이다. process.env 