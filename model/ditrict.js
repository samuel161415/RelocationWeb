const mongoose= require('mongoose')

const District=new mongoose.Schema({

    district_name:{
        type:String,
        required:true,
    },
    atms:{
        type:Array,
        required:true
    }
    // categories:{type:Object, required:true},
    // atmIds:{type:Array,required:true},
    // result:{type:Object,required:true}
  
}, {
    timestamps:true
}
)
module.exports=mongoose.model("DISTRICTS",District)