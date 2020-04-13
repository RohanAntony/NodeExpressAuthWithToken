const express = require('express')
const router = new express.Router()

const User = require('../models/User')
const { authenticated } = require('../utils/middleware')

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findUserByCredentials(email, password)
        const token = await user.generateNewAuthToken()
        res.status(200).send({ token })
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/logout', authenticated, async (req, res) => {
    try{
        await req.user.logout(req.token)
        res.send('Logged out')
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/logoutAll', authenticated, async (req, res) => {
    try{
        await req.user.logoutAll()
        res.send('Logged out of all devices')
    }catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})

router.post('/register', async (req, res) => {
    try{
        const {email, password} = req.body
        const newUser = new User({
            email, password
        })
        const user = await newUser.save()
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = router