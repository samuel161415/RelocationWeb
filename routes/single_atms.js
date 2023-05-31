const router=require('express').Router();
const District=require('../model/ditrict')
const Atm_Status=require('../model/atm_status')

router.post('/single',async(req,res)=>{

    const {terminal_id}=req.body

     const data= await Atm_Status.findOne({terminal_id:terminal_id})

     return res.json(data)

})

module.exports=router