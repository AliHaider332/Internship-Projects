const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String
  },
  pic:{
    type:String,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  password:{
    type:String,
    required:true
  },
});

module.exports=mongoose.model("USER",userSchema);
