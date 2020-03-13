const pool = require("../config/database.config");
const bcrypt = require("bcrypt");

function login(res, user) {
    pool.query("SELECT * FROM user WHERE user.username = ?", user.username, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        if(results.length == 0 ){
            return res.send({success: false, msg: "Invalid Username/Password"})
        }

        bcrypt.compare(user.password, results[0].password, (err, matched) => {
            if (err) {
                return res.send({ success: false, msg: "Something went wrong." })
            }
            if (!matched) {
                return res.send({ success: false, msg: "Incorrect Username/Password" })
            }
            res.send({ success: true, msg: `Welcome Back, ${results[0].username}!`, username: results[0].username })
        })
    })
}

// Check to see if username is already in use
// If not in use hash and save
// If in use, send error

// TODO: Pull out repeated code
function signup(res, user) {
    pool.query("SELECT * FROM user WHERE user.username = ?", user.username, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        if(results.length > 0 ){
            return res.send({success: false, msg: "Username already in use."})
        }
        bcrypt.hash(user.password, 10, (err, hashedPassword)=>{
            if(err){
                return res.send({success: false, msg: "Something went wrong."})
            }
            pool.query("INSERT INTO user SET ?", {username: user.username, password: hashedPassword}, (err, results)=>{
                if(err){
                    return res.send({success: false, err: err})
                }
                return res.send({success: true, msg: "Successfully signed up, please login."})
            })
        })
    })
}

function byUsername(res, username) {
    pool.query("SELECT * FROM user WHERE user.username = ?", username, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        return res.send({ success: true, data: results })
    })
}

function byUserID(res, userID) {
    pool.query("SELECT * FROM user WHERE user.id = ?", userID, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        return res.send({ success: true, data: results })
    })
}

function allUsers(res) {
    pool.query("SELECT * FROM user", (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        return res.send({ success: true, data: results })
    })
}

function deleteByID(res, userID) {
    pool.query("DELETE FROM user WHERE user.id = ?", userID, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        res.send({ success: true });
    })
}

function updateByID(res, userID, password) {
    pool.query("UPDATE user SET password = ? WHERE user.id = ?", [password, userID], (err, results) => {
        if (err) {
            return res.send({ success: false, err: err })
        }
        return res.send({ success: true })
    })
}

module.exports.allUsers = allUsers;
module.exports.updateByID = updateByID;
module.exports.deleteByID = deleteByID;
module.exports.byUserID = byUserID;
module.exports.byUsername = byUsername;
module.exports.signup = signup;
module.exports.login = login;