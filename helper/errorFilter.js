const errorFilters=(conditionName,conditionValue,atmValue)=>{

   res={}
   //console.log('value ',atmValue,' name ',conditionName,' cv ',conditionValue);
    for(var i=0;i<atmValue.length;i++){
        console.log();
        res[conditionName[i]]=conditionValue[Number(atmValue[i])]
    }

    return res

}

module.exports=errorFilters