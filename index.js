const express = require('express')
const app = express()

// const {serverConfig} = require('./config/settings')

const routes = require('./controller/Routes')

app.set('view engine', 'ejs');
app.use(express.static('views/static'));
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3000, function(){
    console.log(`SERVER IS RUNNING ON PORT: ${this.address().port}!`)
})