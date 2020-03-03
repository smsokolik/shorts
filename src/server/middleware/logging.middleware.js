function ipLogger(req,res,next){
    console.log(req.ip);
    next();
}

module.exports = ipLogger;