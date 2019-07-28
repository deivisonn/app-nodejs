const express = require('express');
const bcrypt = require('bcrypt');
const Joi =  require('@hapi/joi');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoConnect = require('../models/mongo_connect');

//CONFIG
	//Body-parser
	router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());
    //DataBaseConfig.
    const DataBase = 'mongodb://localhost/blogModel';
    mongoConnect(DataBase);
    const userModel = require('../models/userModel');

router.get('/',(req,res)=>{
    let results = userModel.find({name: 'q'})
    res.status(200).render('home', {style: 'home.css'});
});

router.get('/login', (req,res)=>{
    res.status(200).render('login');
});

router.get('/register', (req,res)=>{
    res.status(200).render('register');
});

router.post('/login', (req,res)=>{
    res.status(201).send();
});

router.post('/register', (req,res)=>{

    userModel.findOne({email: req.body.email}, (err, user)=>{
        if (err){
            res.status(400).send(err);
        };
        if(user){
            res.redirect('/register')
        }else {
            const schema = Joi.object().keys({
                username: Joi.string().alphanum().min(3).max(30).required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                email: Joi.string().email({minDomnainSegments: 2}).required()
            }).with('password', 'email');
        
            const result = Joi.validate({
                username: req.body.name,
                password: req.body.password,
                email: req.body.email
            }, schema)

            if(result.error === null){
                const user = new userModel();
    
                user.name = req.body.name;
                user.password = req.body.password;
                user.email = req.body.email;
                user.save({})
                .then(()=>{
                    console.log('success')
                })
                .catch((err)=>{
                    console.log(err)
                });
                res.status(201).redirect('/');
            }else{
                console.log('verify the data and try again')
                res.status(400).redirect('/register')
            }
        }
    });

    
});

module.exports = router;