
const verifyConnection = (req, res, next) => {
    if(req.session.userId) return res.status(401).send('You are already connected')
    next();
}

const verifyAuth = (req, res, next) => {
    if(!req.session.userId) return res.status(401).send('Acces Denied')
    next();
}


module.exports.verifyConnection = verifyConnection;
module.exports.verifyAuth = verifyAuth;