const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://127.0.0.1:27017/UserDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((err) => {
    console.log(err)
})