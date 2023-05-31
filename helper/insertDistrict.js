const District=require('../model/ditrict')
const createOrupdate= async(district_name,terminal_id)=>{

    const dataFound=await District.findOne({district_name:district_name})
     
    if(dataFound && dataFound.atms.length>0){
       console.log('exist file',dataFound.atms);
       const val=dataFound.atms
       val.push(terminal_id)
       console.log('val is ',val);
       await District.updateOne(
          {district_name:district_name},
          {$set:{
             atms:val
          }}
       )
    }
    else{
       console.log('no file',district_name);
       const inserted= new District({
          district_name:district_name,
          atms:[terminal_id]
       })
       const savedDistrict=await inserted.save();
    }
   
  

}
module.exports=createOrupdate