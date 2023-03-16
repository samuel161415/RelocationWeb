const router=require('express').Router();
const User=require('../model/user')
const CryptoJs=require('crypto-js');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>{

      const user=await User.find({username:req.body.username});
 
      if(user.length>0)  return res.status(401).json("user exists");
      const newUser=new User({
      username:req.body.username,
      admin:req.body.admin,
      district:req.body.district,
      password:CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    })
  
    try{
       const savedUser=await newUser.save();
       return res.status(201).json(savedUser)
    }
    catch(err){
      return res.json('')
    }
  })



  // login

router.post('/login',async(req,res)=>{

      try{
    
        const user=await User.findOne({username:req.body.username});
     

        if(!user)  return res.status(401).json("wrong credential");
    
        const tempPass=user.password;
    
        var decrypted = CryptoJs.AES.decrypt(tempPass,process.env.PASS_SEC).toString(CryptoJs.enc.Utf8);
        if(decrypted!==req.body.password) return res.status(401).json('wrong credentials');
    
        // const accessToken = jwt.sign(
        //   {
        //     id:user._id,
        //     isAdmin:user.isAdmin,
        //   },
        //   process.env.JWT_SEC,
        //   {
        //     expiresIn:"10d"
        //   }
        // )
        // returning password to user is wrong so return everything except password
        const{password, ...others}=user._doc;
        
       return res.status(200).json({...others})
    }
      catch(err){
       return  res.status(500).json(err)
      }
    })

    router.put('/update',async(req,res)=>{

    
      try{
        if(req.body.password){
          password=CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
          req.body.password=password
       
        } 
          
          const update=await User.updateOne(
                 { username: req.body.username },
                 { $set: req.body }, // use this format for update or updateOne. 
                                                                   //it changes the values in upadate and leaves the other fileds unchanged
                   { upsert: true }  // used to insert if the object not found
              )
      
              res.send(update)
         
      }
      catch(err){
          res.send('error'+err)
      }
      })

module.exports=router

