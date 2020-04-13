const tokenOps = require('./token')
const User = require('../models/User')
const {ObjectId} = require('mongodb')

const authenticated = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const tokenUser = tokenOps.verify(token)
        if(!tokenUser)
            throw new Error('Token invalid! Please authenticate')
        const dbUser = await User.findOne({ 
            _id: new ObjectId(tokenUser._id), 
            "tokens.token": token
        })
        if(!dbUser)
            throw new Error('Token invalid! Please authenticate')
        req.user = dbUser
        req.token = token
        next()    
    }catch(e){
        res.status(500).send(e.message)
    }
}

module.exports = {
    authenticated
}