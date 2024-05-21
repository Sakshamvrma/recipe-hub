const express=require('express');
const app=express();
app.use(express.static(__dirname + 'public'));
app.get('/',(req,res)=>{
  res.send("Hii there")
});
app.listen(3000,(req,res)=>{  
  console.log("Server is running on port 3000")
});