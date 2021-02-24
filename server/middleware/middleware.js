const jwt = require("jsonwebtoken");
const pool = require("../db");

const middleware = async (req, res, next) => {
    setTimeout(() => {
        next(); //next just means that we are done here so send it off to the endpoint function, so this fxn goes to the next router fxn
    }, 2000);
};

module.exports = middleware;
