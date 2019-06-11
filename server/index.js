require('dotenv').config()
let {SERVER_PORT, SESSION_SECRET} = process.env
const CTRL = require('./controllers')
const express = require('express')
const session = require('express-session')



const app = express()
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookes: {maxAge: 3600000}
}))
app.use((req, res, next) => {
    let badWords = ['buttface', 'butthead']
    if (req.body.message) {
        for (let i = 0; i < badWords.length; i++){
            let regex = new RegExp(badWords[i], 'g')
            req.body.message = req.body.message.replace(regex, '****')
        }
        next()
    }   else {next()}
})


app.get('/api/messages', CTRL.getAllMessages)
app.post('/api/message',CTRL.createMessage)
app.get('/api/messages/history', CTRL.getHistory)






app.listen(SERVER_PORT, () => console.log('nice job', SERVER_PORT))