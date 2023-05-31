const mongoose= require('mongoose')

const AtmStatus=new mongoose.Schema({
    terminal_id:{
        type:String,
        required:true
    },
    date:{
        type:Array,
         required:true
        },
    status:{
        type:String,
        required:true
    },
    district_name:{
        type:Array,
        required:true
    },
    branch:{
        type:Array,
        required:true,
    },
    ip:{
        type:Array,
        required:true,
    },
    terminal_ids:{
        type:Array,
        required:true
    }

}, {
    timestamps:true
}
)
module.exports=mongoose.model("ATM_STATUS",AtmStatus )