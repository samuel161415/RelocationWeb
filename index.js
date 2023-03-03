const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


  const hardware=require('./routes/hardware')
  const singleAtm=require('./routes/singleAtm')


 app.use('/api',hardware)
 app.use('/api',singleAtm)

  app.listen(process.env.PORT||5000,()=>{
  console.log('app is listning');
  })