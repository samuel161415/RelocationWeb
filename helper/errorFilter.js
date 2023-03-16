const errorFilters=(conditionName,conditionValue,atmValue)=>{

   res={}

    for(var i=0;i<atmValue.length;i++){
        
        res[conditionName[i]]=conditionValue[Number(atmValue[i])]
    }

    return res

}

module.exports=errorFilters