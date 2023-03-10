const jwt = require('jsonwebtoken');

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const expiration ='2h';

module.exports = {
    authMiddleware: function({req}) { 
        let token = req.params.token || req.query.token || req.headers.authorization;
        if (req.hedaers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token: ' + token);
        }
        return req;
    },
    signToken: function ({ firstName, email, _id }) {
        const payLoad = { firstName, email, _id };
        return jwt.sign({ data: payLoad }, secret, { expiresIn: expiration });
    },
};