const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(new passportLocal({

    usernameField : 'email'
    }, function(email, password, done){
        User.findOne({email : email}, function(err, user){
            if(err){
                console.log("Not able to find the user");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("something went wrong");
                return done(null, false);
            }
            
            return done(null, user);

        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(userId, done){

    User.findById(userId, function(err, user){
        if(err){
            console.log("Error while finding id whle deserialising the cookie");
            return done(err);
        }
        return done(null, user);
    });
});
passport.checkAuthentication = function(req, res, next){
    if( req.isAuthenticated() == true ){
        return next();
    }
    //if not then redirect to sign in page, he trying to access page without logged-in/sign-in
    return res.redirect("/user/sign-in");
}

passport.setAuthenticatedUser = function( req, res, next){
    
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;