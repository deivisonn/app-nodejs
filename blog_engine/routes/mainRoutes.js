const express = require('express');
const mongoose = require('mongoose');
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
    res.status(201).send();
});

module.exports = router;