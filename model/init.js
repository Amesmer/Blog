//创建用户集合
// 引入mongoose 第三方模块
const mongoose =require('mongoose');
const Joi=require('joi');

const userSchema= new mongoose.Schema({
        username:{
          type:String,
          required:true,
          minlength:2,
          maxlength:20

        },
        email:{
            type:String,
          //   保证邮箱地址在插入数据库时不重复
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
          type:String,
          required:true
        },
      //   启用状态
      // 禁用状态
        state:{
            type:Number,
            default:0
        }  
});

// 创建集合
const User=mongoose.model('User',userSchema);


User.create({
    username:"admin",
    email:'234105@qq.com',
    password:'123456',
    role:'admin',
    state:0
}).then(()=>{
    console.log('用户创建成功');
    
}).catch(()=>{
    console.log('用户创建失败');
    
})