const express = require("express");
const router = express.Router();
const users = [];
const bcrypt = require("bcrypt")

router.post("/signup", (req, res)=>{
    // check if username is already in use
    if(req.body.username === undefined || req.body.password === undefined){
        return  res.send({success: false, msg: "Incorrect data provided."})
    }
    let filteredUsers = users.filter(user => user.username === req.body.username);

    if(filteredUsers.length > 0){
        return res.send({success: false, msg: "Username already in use."})
    }
    // hash the password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
        if(err){
            return   res.send({success: false, msg: "Something went wrong."})
        }
        users.push({username: req.body.username, password: hashedPassword})
        console.log(users)
        return res.send({success: true, msg: "Successfully signed up, please login."})
    })
})


router.post("/login", (req, res)=>{
    if(req.body.username === undefined || req.body.password === undefined){
        return  res.send({success: false, msg: "Incorrect data provided."})
    }

    let filteredUser = users.filter(user => user.username === req.body.username)[0];

    if(filteredUser == undefined){
        return res.send({success: false, msg: "Incorrect username/password"})
    }

    bcrypt.compare(req.body.password, filteredUser.password, (err, matched)=>{
        if(err){
            return   res.send({success: false, msg: "Something went wrong."})
        }

        if(!matched){
            return res.send({success: false, msg: "Incorrect username/password"})
        }
        res.send({success: true, msg: "Welcome Back!", username: req.body.username})
    })

})

module.exports = router;