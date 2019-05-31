const jwt = require('jsonwebtoken');

module.exports = {
  name: 'jwt-db',
  policy: (actionParams) => {
    return (req, res, next) => {

      const token = req.query.token || req.headers.authorization

      if (token)
        res.send(token)

      if (token) {
        jwt.verify(token, actionParams.secret, function (err, decoded) {
          if (err) res.status(403).json({ message: err.message }).end();
          else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        res.status(403).json({ message: 'No token provided test' }).end();
      }
    };
  }
};
