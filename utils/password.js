const bcrypt = require('bcrypt')

const saltRounds = () => {
    const min = 8, range = 3;
    return (min + Math.floor(Math.random() * range))
}

const hash = async (password) => {
    try{
        const rounds = saltRounds()
        const hash = await bcrypt.hash(password, rounds) 
        return hash;    
    }catch(e){
        console.log(e)
    }
}

const verify = async (password, hashedPassword) => {
    try{
        const isValid = await bcrypt.compare(password, hashedPassword)
        return isValid    
    }catch(e){
        console.log(e)
        return false
    }
}

//To test functionality immediately
// (async () => {
//     try{
//         const token = await hash('test123')
//         console.log(token)
//         console.log(await verify('test123', token))    
//     }catch(e){
//         console.log(e)
//     }
// })();

module.exports = {
    hash,
    verify
}