const path = require("path");  
const express = require("express");
const jwt = require ("jsonwebtoken");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const UserData = require ('./src/model/user');

var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use("/uploads" , express.static(path.join("uploads")));

//signup
app.post('/adduser' , function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");

    var password = req.body.user.paswd.trim();

    bcrypt.hash(password,12, function(err,hash){

        var signemail = req.body.user.email.trim();
        var signusername = req.body.user.username.trim();

        var messg = "";

        UserData.findOne({"email" : signemail})
       .then(function(user){
           if(user){
               res.status(401).send("Email id already exists");
            }
    
            UserData.findOne({"username" : signusername})
            .then(function(users){
                if(users){
                    res.status(401).send("Username is already taken. Use another");
                }
                 else if(user==null && users==null){
                    console.log("success signup");
                    var user = {
                        fname : req.body.user.fname.trim(),
                        lname : req.body.user.lname.trim(),
                        email : signemail,
                        phno : req.body.user.phno.trim(),
                        username : signusername,
                        paswd : hash
                    }
                
                    var user = new UserData(user);
                    user.save()  
                    messg = "Success";
                    res.status(200).send({messg});
                } 
            })
        })
    });
});
//login
app.post('/login' , function(req,res){
    console.log("login");
    let logemail = req.body.email.trim();
    let logpassword = req.body.paswd.trim();

    //admin login
    if(logemail == "meeramaluanju@gmail.com" && logpassword == "meeramaluanju"){
        let username = "admin";
        let payload = {subject: logemail + logpassword};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send({token,username});
    }
    else{
    //user login
    
    UserData.findOne({email : logemail})
    .then(function(user){
        bcrypt.compare(logpassword,user.paswd, function(err,result){
            if(result){
                let payload = {subject: logemail + logpassword};
                let token = jwt.sign(payload,'secretKey');
                console.log(token);
                let userid = user._id;
                res.status(200).send({token,userid}); 
            }
            else{
                res.status(401).send("Invalid Email or Password");
            }
        })            
    })
    .catch(function(){
        res.status(401).send("Invalid Email or Password");
    })
    }
})

function verifyToken(req,res,next){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    if(!req.headers.authorization){       
        return res.status(401).send('Unauthorized request');
    }
    
    let token = req.headers.authorization.split(' ')[1];  
    if(token == "null"){
        return res.status(401).send('Unauthorized request');
    }
    
    let payload = jwt.verify(token , 'secretKey');
    if(!payload){
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();   //if correct user request 

}
const postRouter = require("./src/routes/postRoutes")(verifyToken);
app.use("/posts", postRouter);


app.get('/getusername/:userid' , function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const userId = req.params.userid;
    UserData.findOne({"_id":userId})
    .then(function(user){ 
        res.send(user);
    });
}); 

app.get('/user/:userid',function(req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    const userid = req.params.userid;

    UserData.findOne({"_id":userid})
    .then(function(user){ 
        res.send(user);
    });
});
//update a user
app.put('/updateuser/:userid' , function(req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    console.log("hai");
    var userid = req.params.userid;
    var password = req.body.paswd.trim();
    

    if(password!= ""){
        bcrypt.hash(password,12, function(err,hash){
            UserData.findByIdAndUpdate({"_id" : userid },
                                      {$set : {
                                          "fname" : req.body.fname.trim(),
                                          "lname" : req.body.lname.trim(),
                                          "email" : req.body.email.trim(), 
                                          "phno" :req.body.phno.trim(),
                                          "username":req.body.username.trim(),
                                          "paswd" :hash                         
                                      }})
    
            .then(function(){
            res.send();
            })
        })
    }
    else{
        UserData.findByIdAndUpdate({"_id" : userid },
        {$set : {
            "fname" : req.body.fname.trim(),
            "lname" : req.body.lname.trim(),
            "email" : req.body.email.trim(), 
            "phno" :req.body.phno.trim(),
            "username":req.body.username.trim(),                     
        }})

       .then(function(){
            res.send();
       })
    }
    

                                
})

app.listen(port,()=>{console.log("Server Ready at "+port)});
