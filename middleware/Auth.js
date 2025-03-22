const jwt =require("jsonwebtoken")

require('dotenv').config()

exports.auth = (req, res, next) =>
{
    const token= req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    if (!token || token == undefined)
    {
        return res.status(401).json({
            success: false,
            msg: "Token Missing"
        })
    }
    try{
        const payload = jwt.verify(token, process.env.secret);
        req.user = payload;

    }
    catch(err)
    {
        res.send("ERROR");
        console.log(err);
    }
    // res.send("AUTH DONE");
    next();
}

exports.isStudent = (req, res, next) =>
{
    try
    {
        if (req.user.role === "Admin")
            next();
        console.log(req.user.role);
        if (req.user.role !== "Student")
        {
            return res.status(401).json({
                success: false,
                msg: "YOU ARE NOT ALLOWED TO VIEW"
            })
        }
        next();
    }
   
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "ERROR",
        })
    }
}
exports.isAdmin = (req, res, next) =>
{
    try
    {
        if (req.user.role !== "Admin")
        {
            return res.status(401).json({
                success: false,
                msg: "YOU ARE NOT ALLOWED TO VIEW"
            })
        }
        next();
    }
   
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "ERROR",
        })
    }
}