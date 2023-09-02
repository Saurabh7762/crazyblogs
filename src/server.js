import fs from 'fs'
import admin from 'firebase-admin'
import express from "express";
import { db, connectTODb } from "./db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


const credentials=JSON.parse(
  fs.readFileSync('./credentials.json')
);
admin.initializeApp({
  credential:admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname,'../build')));

/*app.get(/^(?!\/api).+/,(req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'))
})*/

app.use(async(req, res, next)=>{
  const {authtoken}= req.headers;


  if(authtoken){
    try{
      req.user=await admin.auth().verifyIdToken(authtoken);
    }catch(e){
      return req.sendStatus(400);
    }
  }
  req.user=req.user || {};
  next();

});

app.get('/api/articles/:name',async(req, res)=>{
  const {name}=req.params; 
  const{uid}=req.user;
  const article=await db.collection('articles').findOne({name})
  if(article){
    const upVoteIds= article.upVoteIds || [];
    article.canUpvote = uid && !upVoteIds.includes(uid);
    res.json(article);
  }else{
    res.sendStatus(404);
  }
  
});


app.use((req, res, next)=>{
  if(req.user){
    next();
  }else{
    res.sendStatus(401);
  }
})

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const {uid} = req.user;
  
  const artical=await db.collection('articles').findOne({name});
  if(artical){
    const upVoteIds=artical.upVoteIds || [];
    const canUpvote = uid && !upVoteIds.includes(uid);

    if(canUpvote){
       await db.collection("articles").updateOne(
         { name },
         {
           $inc: { upvote: 1 },
           $push:{upVoteIds:uid}
         }
       );
    }
      const updatedArticle = await db.collection("articles").findOne({ name });
      res.json(updatedArticle);
  }else{
    res.send('That artcle doesn\'t exist' );
  }
});



app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection('articles').updateOne(
    { name },
    {
      $push: {comments: {postedBy, text} },
    }
  );


  const article = await db.collection('articles').findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send("this artical doesent exist");
  }
});
const PORT=process.env.PORT || 8000;

connectTODb(()=>{
  console.log('sucessfully connected to server');
  app.listen(PORT, () => {
    console.log("server is listening on port "+PORT);
  });

})