const User = require('../models/users');
module.exports.signIn = function(req, res){
    if(req.isAuthenticated() == true){
        //console.log("user is authenticate, we can't allow you to aceess sign-in page"); 
        return res.redirect('/');
    }
    return res.render('signIn');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated() == true){
        return res.redirect('/');
    }
    return res.render('signUp');
}

module.exports.createUserSchema = async function(req, res){

    if(req.body.password != req.body.confirm_password) {
        console.log('password and confirm password are not same');
        return res.redirect("back");
    }

    try{
        let user = await User.findOne({email: req.body.email});
        if( !user ) {
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error while creating user");
                    return;
                }else{
                    console.log("Accout has been created");
                    return res.redirect("/users/sign-in");
                }
                
            });
        }
        else{ 
            console.log("Email is already taken");
            return res.redirect("back");
        }

    }catch(err){
        console.log("Enable to find user", err);
        return;
    }

}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return next(err);
        }         
    });   
   
    return res.redirect("/users/sign-in");
}

module.exports.createSession = function(req, res){

    console.log('Login successfull');
    return res.redirect('/');
}
