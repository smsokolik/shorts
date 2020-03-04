const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const userModel = require("../models/users.model");

router.post("/signup", (req, res)=>{
    // check if username is already in use
    if(req.body.username === undefined || req.body.password === undefined){
        return res.send({success: false, msg: "Incorrect data provided."})
    }
    userModel.signup(res, req.body);
})


router.post("/login", (req, res)=>{
    if(req.body.username === undefined || req.body.password === undefined){
        return  res.send({success: false, msg: "Incorrect data provided."})
    }
    // implement the model login function
    userModel.login(res, req.body)
})

module.exports = router;