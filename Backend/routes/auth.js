const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchuser')

//secure communication between user and server database
const JWT_SECRET = "Raunakdetailssavefromscammmers"

//ROUTE:1 Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:5}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min:5}),

] , async (req,res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with this email exists already
    try{
        let user = await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({success, error: "email id already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            phone: req.body.phone
        })

        //which data you send
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken})

    // catch error
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})


//ROUTE:2 Authentication a User using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
] , async (req,res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error: "please enter correct credentials"})
        }
        const passwordcompare= await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            success = false;
            return res.status(400).json({success, error: "please enter correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken})
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})

//ROUTE:3 get User logged in details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req,res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
module.exports= router