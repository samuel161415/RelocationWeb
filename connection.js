const mongoose = require('mongoose')

 connectDB =  async() => {

    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL) 
        console.log('connected');
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
module.exports=connectDB