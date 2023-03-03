const router=require('express').Router();
const errorFilters=require('../helper/errorFilter')
router.post('/singleAtm',(req,res)=>{
    // i used array as map to differential each conditions by idx
    console.log('called');
    const sensor=['card_capture_bin_sensor','dispensor_reject_bin_sensor',
    'hoper1_sensor','hoper2_sensor','hoper3_sensor','hoper4_sensor',
    'vibration_heat','door_sensor']

    const supply=[
        'card_capture_bin_supply','dispensor_reject_bin_supply','hoper1_supply',
        'hoper2_supply','hoper3_supply','hoper4_supply','supply_receipt_supply',
        'supply_receipt_ink_supply'    ]
    const fitness=[
        'encryptor','magnetic_card_reader','smart_card_reader','cash_dispensor',
        'hoper1','hoper2','hoper3','hoper4','receit_printer'
    ]

    const fitness_error=['Fitness Ok','Fitness Routine Error','Fitness Warning','Fitness Suspended','Fatal Error']
    const supply_error=['Unchanged','Good','Low','Out','Overfill','High']
    const sensor_error=['None','Good','Inactive']


    const {terminalId,result}=req.body
    atmValues=result[terminalId]


    const finalResult=[]
   
    finalResult.push(errorFilters(fitness,fitness_error,atmValues.fitness_array))
    finalResult.push(errorFilters(supply,supply_error,atmValues.supply_array))
    finalResult.push(errorFilters(sensor,sensor_error,atmValues.sensor_array))

    

    return res.json(finalResult)

})


module.exports=router