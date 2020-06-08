const db = require('../models');


async function register(req, res, next) {
    if (!req.body.email) {
        return res.status(400).json({message: 'email is missing'});
    }
    if (!req.body.password) {
        return res.status(400).json({message: 'password is missing'});
    }

    const user = await db.User.create({
        email: req.body.email,
        password: req.body.password
    });


    res.json({token: 'xxxxxx'})
}
module.exports = {
    register
}