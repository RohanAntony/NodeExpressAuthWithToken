const express = require('express')

require('./utils/connect') //establish connection with database
const user = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/user', user);

app.get('*', (req, res) => {
    res.send("Other routes")
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})