const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const main = require('./routes/routes')
const app = express();

const {
    PORT,

    NODE_ENV
} = process.env

//Config.
    //Static files
    app.use(express.static('public'));
    //Tamplete engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
	app.set('view engine', 'handlebars');
    //Body-Parser
    app.use(bodyParser.urlencoded({
        extended: false 
    }))
    
//Routes


app.use('/', main);

app.listen(PORT,()=>{
    console.log(`Server up at https://localhost:${PORT}`);
    console.log('Press \'ctrl + c\' to shut down')
})