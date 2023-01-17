const express=require('express');
const app=express();
const JokeAPI = require('sv443-joke-api');

let PORT= 3000 || process.env.PORT;
app.listen(PORT,function(){
  console.log('Server started on port 3000');
})

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
    JokeAPI.getJokes()
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    let flag=0;
    if(data.type === 'single') {
        flag=1;
        console.log(data.joke);
        res.render('index', {Flag:flag,singleJoke: data.joke});
        res.end();
    } else {
        flag=2;
        console.log(data.setup)
        console.log(data.delivery)
        res.render('index',{Flag:flag,Setup:data.setup,Delivery:data.delivery});
        res.end();
    }
  })
})
