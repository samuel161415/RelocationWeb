const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json());
const mongoose =require('mongoose')
const dotenv=require('dotenv')

dotenv.config()
app.use(express.urlencoded({
    extended: true
  }));


 require('./connection')
const connectDB=require('./connection')

connectDB()
 
  const {insertData}=require('./helper/dieboldData')
  const hardware=require('./routes/hardware')
  const singleAtm=require('./routes/singleAtm')
  const user=require('./routes/user')
  // getData()
   setInterval(insertData,10000)
  

 app.use('/api',hardware)
 app.use('/api',singleAtm)
 app.use('/api',user)

  app.listen(process.env.PORT||5000,()=>{
  console.log('app is listning');
  })