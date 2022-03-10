const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require ('jsonwebtoken');

const User =require('../models/user.model');

// register
router.post('/register', async(req, res)=>{
    const {
        user,
        gender,
        pass,
        email,
        birthDate,
        name
    } = req.body;
    
})