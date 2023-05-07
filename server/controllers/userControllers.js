const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, file} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please complete all fields.");
    }

    const exists = await User.findOne({ email });

    if(exists) {
        res.status(400);
        throw new Error("Email is already used, Please try another one.");
    }

    const newUser = await User.create({
        name,
        email,
        password,
        image: file
    });

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            token: generateToken(newUser._id)
        });
    }else{
        res.status(400);
        throw new Error("Failed to create");
    }
});

const authUser = asyncHandler( async (req,res)=>{
    const {email, password} = req.body;
    try {
        let errors = {}
        if(!email || !password){
            errors = { email: "Please enter your email", password: "Please enter your password" };
            res.status(400).json({ errors });
        } 
        const user = await User.findOne({ email: email });
        if(user){
            const checkedPassword = await user.matchPassword(password)
            if(checkedPassword){
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    token: generateToken(user._id)
                });
            }else{
                errors.password = "Your password is incorrect.";
                res.status(400).json({ errors });
            }
        }else{
            errors.email = "Your email is incorrect.";
            res.status(400).json({ errors });
        }
        
    } catch (error) {
        res.status(400).json(error.message);
    }
});

const getUsers = asyncHandler( async (req, res) =>{
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}}
        ]
    } : {};
    
    const users = await User.find(keyword).find({_id: {$ne: req.user._id }});
    res.send(users);
});

module.exports = {  
    registerUser,
    authUser,
    getUsers
};