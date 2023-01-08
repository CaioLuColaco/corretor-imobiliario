const express = require('express')
const app = express()

// const {serverConfig} = require('./config/settings')

const routes = require('./controller/Routes')

app.set('view engine', 'ejs');
app.use(express.static('views/static'));
app.use(express.json())
app.use(express.json({limit: '50mb', extended:true}));
app.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit:10000000}));
app.use(express.text({limit: '200mb'}));


app.use(routes)

app.listen(process.env.PORT || 3000, function(){
    console.log(`SERVER IS RUNNING ON PORT: ${this.address().port}!`)
})