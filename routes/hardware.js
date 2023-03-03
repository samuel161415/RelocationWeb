const router=require('express').Router();
const atmFilter=require('../helper/atmFilter')
router.post('/status',(req,res)=>{
    console.log('what is happening');
    const {atms}=req.body // incoming message formats
    const result={}  // obj that contains atm terminal id as key the other as array
    const atmIds=[]  // arr that contains all atm terminal ids

    atmFilter(atms,result,atmIds)

    const hardware_categories=[]
    const cashout_categories=[]
    const inservice_categories=[]

    const visited=new Set()

    // adding atms to  to hardware_errors
    console.log('all atms',atmIds);
    for(var i=0;i<atmIds.length;i++){
        let fit=result[atmIds[i]].fitness_array
        let sen=result[atmIds[i]].sensor_array
        let sup=result[atmIds[i]].supply_array
        

          // categorizing each atms into their categories
        if((fit.includes('1')||fit.includes('3')||fit.includes('4'))||(sen.includes('2'))){
            hardware_categories.push(atmIds[i])
            visited.add(atmIds[i])
        }
        console.log('hardware catego',hardware_categories);
        if(!(visited.has(atmIds[i]))){
            console.log('cond',atmIds[i] in hardware_categories);
            if(sup.includes('3')||sup.includes('4')) {
                cashout_categories.push(atmIds[i])
                visited.add(atmIds[i])
            }
        }
        if(!((visited.has(atmIds[i]))||(visited.has(atmIds[i])))){
            inservice_categories.push(atmIds[i])
        }
    }
   

  
   return res.send({
    categories:{
        hardware_categories:hardware_categories,
        cashout_categories:cashout_categories,
        inservice_categories:inservice_categories
    },
    atmIds:atmIds,
    result:result

   })
    // res.send(result)

})

module.exports=router