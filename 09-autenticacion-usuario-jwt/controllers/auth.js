const { request, response } = require("express");

const login = (req = request, res = response) => {


    res.json({
        msg: 'Login OK'
    });
}

module.exports = {
    login
};