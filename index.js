const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json());
const dotenv=require('dotenv')

dotenv.config()
app.use(express.urlencoded({
    extended: true
  }));


const connectDB=require('./connection')

connectDB()
 
    const district=require('./routes/district')
    const singleAtms=require('./routes/single_atms')
    app.use('/api',district)
    app.use('/api',singleAtms)


  app.listen(process.env.PORT||5000,()=>{
  console.log('app is listning');
  })