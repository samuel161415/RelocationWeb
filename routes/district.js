const router=require('express').Router();
const District=require('../model/ditrict')
const Atm_Status=require('../model/atm_status')
const createOrupdate=require('../helper/insertDistrict')


router.post('/atms',async(req,res)=>{

   // console.log('hi');
   const {district_name}=req.body
   try{
      const data=await District.findOne({district_name:district_name});

      return res.send(data)
   }
   catch(err){
     return res.json(err)
   }

})




router.put('/update',async(req,res)=>{
  console.log('in update in');
   const {date,status,terminal_id,old_terminal_id,district_name,old_district_name,branch,ip}=req.body
   console.log('datas ',date,status,terminal_id,old_terminal_id,district_name,old_district_name,branch,ip);
   try{
      if(old_terminal_id!==terminal_id){
         
         if(old_district_name!==district_name){
            const data=await District.findOne({district_name:old_district_name});
            const atms=data.atms
            const newArray= atms.filter(value => value !== old_terminal_id);
            // console.log('what',old_district_name);
            const update=await District.updateOne(
               { district_name: old_district_name},
               { $set: {
                  atms:newArray
               } }, // use this format for update or updateOne. 
                  //it changes the values in upadate and leaves the other fileds unchanged
                 { upsert: true }  // used to insert if the object not found
            )
            createOrupdate(district_name,terminal_id)

         }
         else{
            const data=await District.findOne({district_name:district_name});
            const atms=data.atms
            const index = atms.indexOf(old_terminal_id);
            atms.splice(index, 1, terminal_id)
            // console.log('branch update begin',atms);
            const update=await District.updateOne(
               { district_name: district_name},
               { $set: {
                  atms:atms
               } }, // use this format for update or updateOne. 
                                                                 //it changes the values in upadate and leaves the other fileds unchanged
                 { upsert: true }  // used to insert if the object not found
            )
            console.log('branch updated');
         }
   
         const data=await Atm_Status.findOne({terminal_id:old_terminal_id});
         // const {date,district_name,branch,status}=data
         let newDate=data.date
         let newBranch=data.branch
         let newDistrictName=data.district_name
         let newIp=data.ip
         let newTerminals=data.terminal_ids
         newDate.push(date)
         newBranch.push(branch)
         newDistrictName.push(district_name)
         newIp.push(ip)
         newTerminals.push(terminal_id)
   
         const update=await Atm_Status.updateOne(
                     { terminal_id: old_terminal_id},
                     { $set: {
                        district_name:newDistrictName,
                        date:newDate,
                        branch:newBranch,
                        terminal_id:terminal_id,
                        status:status,
                        ip:newIp,
                        terminal_ids:newTerminals

                        
                     } }, // use this format for update or updateOne. 
                                                                     //it changes the values in upadate and leaves the other fileds unchanged
                     { upsert: true }  // used to insert if the object not found
                  )
                  
                return res.json(update)
         
      }
      else{
         const data=await Atm_Status.findOne({terminal_id:old_terminal_id});
         const ipArray=data.ip
         if(ipArray[ipArray.length-1]!==ip){
            ipArray[ipArray.length-1]=ip
         }

         const update=await Atm_Status.updateOne(
            { terminal_id: old_terminal_id},
            { $set: {
               status:status,
               ip:ipArray
               
            } }, // use this format for update or updateOne. 
                                                            //it changes the values in upadate and leaves the other fileds unchanged
            { upsert: true }  // used to insert if the object not found
         )
         return res.json(update)
      }
     
   }
   catch(err){
    return res.json('error')
   }


})

router.post('/add',async(req,res)=>{

   const {date,status,terminal_id,district_name,branch,ip}=req.body
   const new_date=[date.toString()]
   const new_district_name=[district_name]
   const new_branch=[branch]
   const newIp=[ip]
   const newTerminals=[terminal_id]

  
   const isDataRegistered=await Atm_Status.find({terminal_id:terminal_id})
   if(isDataRegistered.length>0) return res.json('atm already registered')
   const newTerminal=new Atm_Status({
      date:new_date,
      status:status,
      terminal_id:terminal_id,
      branch:new_branch,
      district_name:new_district_name,
      ip:newIp,
      terminal_ids:newTerminals

    })
   try{
     
      
      createOrupdate(district_name,terminal_id)
      const savedTerminal=await newTerminal.save();
      // console.log('district_name',district_name);
      return res.status(201).json(savedTerminal)
   }
   catch(err){
     return res.json(err)
   }


})

module.exports=router
