const mongoose = require('mongoose')
const validator = require('validator')

const pwOps = require('../utils/password')
const tokenOps = require('../utils/token')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email passed is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password shouldn\'t contain `password`')
        }
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
});

UserSchema.pre('save', async function(next){
    //Execute only when the user is created with fresh password
    if(this.isNew){ 
        const {password} = this
        const hash = await pwOps.hash(password)
        this.password = hash
    }
    next()
})

UserSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user)
        throw Error('Unable to login')
    const passwordCheck = await pwOps.verify(password, user.password)
    if(!passwordCheck)
        throw Error('Unable to login')
    return user
}

UserSchema.methods.generateNewAuthToken = async function(){
    const { _id } = this
    const token = tokenOps.generate({ _id })
    this.tokens.push({
        token: token
    })
    await this.save()
    return token
}

UserSchema.methods.logout = async function(curToken){
    const newTokenList = this.tokens.filter(token => token.token !== curToken)
    this.tokens = newTokenList
    await this.save()
}

UserSchema.methods.logoutAll = async function(){
    this.tokens = []
    await this.save()
}

const User = mongoose.model('User', UserSchema)

// const newUser = new User({
//     email: 'rohan271995@gmail.com',
//     password: 'testing@123',
//     tokens: [{ token: 'hello'}]
// })
// newUser.save()

module.exports = User