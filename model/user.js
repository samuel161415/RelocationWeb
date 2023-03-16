const mongoose= require('mongoose')

const User=new mongoose.Schema({

    username:{ type:String, required:true,},
    password:{type:String },
    admin:{type:Boolean},
    district:{type:String}

    
}, {
    timestamps:true
}
)
module.exports=mongoose.model("User",User )