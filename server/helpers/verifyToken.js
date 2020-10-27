const jwt = require('jsonwebtoken');

// Middleware verifying if the user is authentified
module.exports = function auth (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Acces Denied, bot authorized');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
      res.status(400).send('Invalid token');
    }
}

