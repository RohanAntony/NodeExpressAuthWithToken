const jwt = require('jsonwebtoken')

//Load this secret key from a environment variable which is set using a common file
const secretKey = "ThisIsASecretKey" 
const expireSeconds = 60 * 60 * 24 * 90

const getHalfToken = (token, tokenGenerated) => {
    const p1Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    const newToken = tokenGenerated ? token.replace( p1Token, '') : p1Token + token
    return newToken
}

const generate = (data) => {
    return getHalfToken(jwt.sign(data, secretKey, { 
        expiresIn: expireSeconds
    }), true)    
}

const verify = (token) => {
    try{
        return jwt.verify(getHalfToken(token, false), secretKey)
    }catch(e){
        console.log(e)
        return null
    }    
}

// (() => {
//     const token = generate({
//         _id: '5e9315be2568ec5888c2bd40'
//     })
//     console.log(verify(token))
// })()

module.exports = {
    generate, 
    verify
}