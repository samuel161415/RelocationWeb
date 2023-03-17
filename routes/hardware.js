const router=require('express').Router();
const Diebold_data=require('../model/diebold')
router.get('/status',async(req,res)=>{

const data=await Diebold_data.find().sort({_id:-1}).limit(1);

  
   return res.send(data[0])
  

})

module.exports=router
