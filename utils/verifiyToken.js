const jwt = require("jsonwebtoken");
const createError = require("./error")


const verifiyToken = (req, resp, next) => {

    const token = req.cookies.access_token;

    if (!token) return next(createError(401, "You are not Authenticated..."));
    jwt.verify(token, process.env.SECRET_KEY, (err, client) => {
        if (err) return next(createError(401, "Token is Invalid..."));
        req.client = client;
        next();
    })
}


const verifiyClient = (req, resp, next) => {
    verifiyToken(req, resp, next, () => {
        if (req.client.id === req.params.id || req.client.isUser) {
            next();
        } else {
            return next(createError(401, "You are not authorisec is Client..."));
        }
    });
}

const verifiyAdmin = (req, resp, next) => {
    verifiyToken(req, resp, next, () => {
        if (req.client.isAdmin) {
            next();
        } else {
            return next(createError(401, "You are not Authorised is Admin..."))
        }
    })
}
module.exports = { verifiyAdmin }