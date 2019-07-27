const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

//CONFIG
	//Body-parser
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.status(200).render('home', {style: 'home.css'});
});

router.get('/login', (req,res)=>{
    res.status(200).render('login');
});

router.get('/register', (req,res)=>{
    res.status(200).render('register');
});

module.exports = router;