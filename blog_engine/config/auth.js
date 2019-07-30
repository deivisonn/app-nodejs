const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

module.exports = function(passport){
    const authenticateUser = (email,password, done)=>{
        
        userModel.findOne({email: email})
        .then(user =>{
            if(!user){
                return done(null, false, {message:'cannot find any count for this email'})
            }

            bcrypt.compare(password, user.password, (err, match)=>{
                if(match) {
                    return done(null, user)
                }else{
                    return done(null, false, {message:'incorrect password'} )
                }
            });

        })
    }
    
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
    passport.deserializeUser((id, done)=>{
        userModel.findById(id, (err, user)=>{
            done(err, user);
        });
    });
};