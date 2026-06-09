const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: "Token nao informado" });

    const parts = authHeader.split(' ');

    if(parts.length !== 2)
        return res.status(401).send({ error: "Erro de Token" });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token malformatado" });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token Invalido" });

        req.usersId = decoded.id;
        req.userEmail = decoded.email;
        req.userTipo = decoded.tipo;
        return next();
    });
};
