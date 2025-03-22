const express = require('express');

const router = express.Router();
const {signup, login} = require('../controller/Auth');
const {auth, isStudent, isAdmin} = require("../middleware/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/test", auth, (req, res) =>{
    res.send("Auth Done");
});
router.get("/studentportal", auth, isStudent, (req, res) =>{
    res.send("WELCOME TO STUDENT PORTAL");
});
router.get("/adminportal", auth, isAdmin, (req, res) =>{
    res.send("WELCOME TO ADMIN PORTAL");
});


module.exports = router;