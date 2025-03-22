const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

require('dotenv').config();
exports.signup = async(req, res) =>{
    try{
        const {name, email, password} = req.body;

        const existinguser = await User.findOne({email});
        if (existinguser){
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            })
        }
        let hashpass;
        try{
            hashpass = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                messaage: "ERROR IN HASHING PASS"
            })
        }
        const user = await User.create({
            name, email, password: hashpass
        })

        return res.status(200).json({
            success: true,
            message: "USER CREATED SUCCESSFULLY"
        })
    }
    catch(err){
        return res.status(500).json({
            success: true,
            messgae: "INTERNAL SERVER ERROR"
        })
    }
}

exports.login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "PLEASE ENTER ALL DETAILS"
            })
        }
        let user = await User.findOne({email})
        if (!user){
            return res.status(401).json({
                success: false,
                messaage:"USER NOT FOUND"
            })
        }

        let payload = {
            email: user.email,
            id: user._id
        }
        if (await bcrypt.compare(password, user.password)){
            let token = jwt.sign(payload, process.env.secret);
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options ={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,

            }
            res.cookie("Token", token, options).status(200).json({
                success:true,
                token,
                user,
                message: "USER LOGIN DONE"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "LOGIN FAILED"
        
        })
    }
}