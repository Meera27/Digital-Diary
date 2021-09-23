const express = require('express');
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
            console.log(post);
            res.send(post);
        });
    });
    
    
    // app.get('/post/:id' , (req,res)=>{
    
    //     const id = req.params.id; 
        
    //     PostData.findOne({"_id":id})
    //     .then((post)=>{
    //         res.send(post);
    //     })
    // })
    
    
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
    });
    
    
    //update a post
    postRoutes.put('/updatepost/:userid' ,verifyToken, function(req,res){
        console.log("update" +req.body);
        const UserId = req.params.userid;
        id = req.body._id,
        UserID = UserId,
        title = req.body.title,
        category = req.body.category,
        content =req.body.post.content,
        image=req.body.post.image
        review =""
        console.log("update");
        console.log(req.body);
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