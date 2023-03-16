const mongoose= require('mongoose')

const DiboldData=new mongoose.Schema({

    categories:{type:Object, required:true},
    atmIds:{type:Array,required:true},
    result:{type:Object,required:true}
  
}, {
    timestamps:true
}
)
module.exports=mongoose.model("DIEBOLD_DATA",DiboldData )