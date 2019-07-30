const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const main = require('./routes/mainRoutes')
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
require('./config/auth')(passport);


const {
    PORT= 3000,

    SESS_SECRET='53cre73',
    NODE_ENV= 'development'
} = process.env

//Config.
    //SESSION
    app.use(session({
        secret: SESS_SECRET,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    //MIDDLEWARE
    app.use((req,res,next)=>{
        res.locals.success_msg =  req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;    
        next();
    });
    

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