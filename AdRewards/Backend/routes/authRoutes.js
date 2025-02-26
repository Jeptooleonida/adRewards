const express = require('express');
const User = require('../models/User');
const router = express.Router();

//SignUp 
router.post('/signup', async (req, res) =>{
    const {name, email, password} =req.body;
    try{
        const user = new User ({name, email, password});
        await user.save();
        res.status(201).json( {message: 'User created successfully', user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Login
router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne( {email});
        if (!user || user.password !== password){
            return res.status(400).json({error:'Invalid user credentials'});
        }
        res.status(200).json({message: 'Login successful', user});    
    }catch (err) {
        res.status(500).json ({error: err.message});
    }
});

module.exports = router;