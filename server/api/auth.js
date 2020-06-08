function register(req, res, next) {
    if (!req.body.email) {
        return res.status(400).json({message: 'email is missing'});
    }
    res.json({token: 'xxxxxx'})
}
module.exports = {
    register
}