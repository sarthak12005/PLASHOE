const express = require('express');
const jwt = require('jsonwebtoken');
// require('dotenv').require();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message: `The user is not authorized`});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId:decoded.userId}
        next();
    } catch (error) {
        res.status(400).json({message: "The user does not found"});
    }
} 


module.exports = authMiddleware;