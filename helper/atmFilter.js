const atmFilter=(atms,result,atmIds)=>{

    atms.map((val)=>{
        let fitness=''
        let sensor=''
        let supply=''
        for(var i=0;i<val.fitness_array.length;i++){
           if(i===0||i===1||i===2||i===3||i===5||i===6||i===7||i===8||i===18){
               fitness+=val.fitness_array[i]
           }
           if(i===0||i===1||i===2||i===3||i===4||i===5||i===14||i===15){
            sensor+=val.sensor_array[i]
           }
           if(i===0||i===1||i===2||i===3||i===4||i===5||i===15||i===20){
            supply+=val.supply_array[i]
           }
        }
    
        atmIds.push(val.term_id)
        result[val.term_id]={
           fitness_array:fitness,
           supply_array:supply,
           sensor_array:sensor
        }
    })

}

module.exports=atmFilter

