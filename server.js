const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app');
dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.
connect(DB,{}
).
then(()=>{
  console.log('Database connected less Gooo!!!!!!!')
});
app.get('/',(req,res)=>{
  res.send('Hello from the server side');
});
const port=process.env.PORT || 3000;
const server=app.listen(port,()=>{
  console.log(`Server is running on port ${port}......`)
})