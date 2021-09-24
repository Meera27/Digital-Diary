const express = require('express');
const multer = require('multer');
const postRoutes = express.Router();
const PostData = require ('../model/post');


function router(verifyToken){

    //show all blogs by category
    postRoutes.get('/blogsbyCatg/:category' , function (req,res){
        res.header("Access-control-Allow-Origin" , "*");
        res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS"); 
        let category = req.params.category;
        PostData.find({"category":category})
        .then(function(blogs){ 
            res.send(blogs);
        });
    });
    
    //show all users posts
    postRoutes.get('/myposts/:userid' ,verifyToken, function (req,res){
        res.header("Access-control-Allow-Origin" , "*");
        res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
        const userId = req.params.userid;
        PostData.find({"UserID":userId})
        .then(function(posts){ 
            res.send(posts);
        });
    });

    //single post
    postRoutes.get('/singlepost/:postid',function(req,res){
        res.header("Access-control-Allow-Origin" , "*");
        res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
        const postId = req.params.postid;
    
        PostData.findOne({"_id":postId})
        .then(function(post){ 
            res.send(post);
        });
    });
    
    //to get details of the post for update page 
    postRoutes.get('/post/:postid',function(req,res){
        res.header("Access-control-Allow-Origin" , "*");
        res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
        const postId = req.params.postid;
    
        PostData.findOne({"_id":postId})
        .then(function(post){ 
            res.send(post);
        });
    });
    
    //image upload using multer
    const storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, 'uploads');
        },
        filename: (req, file, callBack) => {
            callBack(null, `DigitalDiary_${file.originalname}`)
        }
    })
    
    var upload = multer({storage: storage})
    
    postRoutes.post('/file/:postid' , upload.single('image'),(req,res,next) => {
        const file = req.file;
        console.log(file.filename);
        const postId = req.params.postid;

        PostData.findByIdAndUpdate({"_id":postId},
                                      {$set : {
                                          "image" : req.file.filename                       
                                      }})
        .then(function(){
            res.send();
        })
        // if(!file){
        //     const error = new Error('Please upload a file')
        //     error.httpStatusCode = 400;
        //     return next(error);
        // }
        // res.send(file);

    })
    //add new post
    postRoutes.post('/insertpost/:userid' ,verifyToken, function (req,res){
        res.header("Access-control-Allow-Origin" , "*");
        res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
        const UserId = req.params.userid;

        console.log("insert");
        console.log(req.body);
    
        var post = {
            UserID : UserId,
            title : req.body.post.title,
            category : req.body.post.category,
            content :req.body.post.content,
            image:req.body.post.image,
            review :req.body.post.review
            
        }
    
        var post = new PostData(post); 
        post.save();
        console.log("id " + post._id);
        res.send(post._id);
        
    });
    
    
    //update a post
    postRoutes.put('/updatepost/:userid' ,verifyToken, function(req,res){
        const UserId = req.params.userid;
        id = req.body._id,
        UserID = UserId,
        title = req.body.title,
        category = req.body.category,
        content =req.body.content,
        image=req.body.image,
        review =""
        console.log("update" + image);
        PostData.findByIdAndUpdate({"_id" : id },
                                      {$set : {
                                          "UserID" : UserID,
                                          "title" : title,
                                          "category" : category, 
                                          "content" :content,
                                          "image":image,
                                          "review" : ""                           
                                      }})
    
        .then(function(){
            res.send();
        })
        var imgid = id;
       res.status(200).send({imgid}) ;                              
    })
    postRoutes.put('/blog/:postId', function(req,res){
        const postId = req.params.postId;
        review=req.body.review;
        console.log("review is "+req.body.review);  
        PostData.findByIdAndUpdate({"_id":postId},
                                      {$set : {
                                          "review" : review                       
                                      }})
        .then(function(){
            res.send();
        })
        console.log("BACKEND "+postId);
        console.log()
    })
    // delete post
    postRoutes.delete('/removepost/:id' ,verifyToken, function(req,res){
        id = req.params.id;
        PostData.findByIdAndDelete({ "_id" : id })
        .then(()=>{
            console.log('success');
            res.send();
        })
    })
    
    postRoutes.delete('/deletepost/:id',function(req,res){
        const id = req.params.id;
        PostData.remove({_id: id})
        .then(function(){
            res.status(200).json({id});
        })
    });


    return postRoutes;
}

module.exports = router;