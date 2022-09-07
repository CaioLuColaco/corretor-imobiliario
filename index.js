const express = require('express')
const app = express()

const {serverConfig} = require('./config/settings')

const routes = require('./controller/Routes')

app.set('view engine', 'ejs');
app.use(express.static('views/static'));
app.use(express.json())

app.use(routes)

app.listen(serverConfig.port, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${serverConfig.port}!`)
})