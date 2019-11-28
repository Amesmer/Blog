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


// User.create({
//     username:"zhangsan",
//     email:'itheima@itcast.cn',
//     password:'123456',
//     role:'admin',
//     state:0
// }).then(()=>{
//     console.log('用户创建成功');
    
// }).catch(()=>{
//     console.log('用户创建失败');
    
// })


const bcryptjs=require('bcryptjs');
async function createuser(){
    // 生成盐
    const salt =await bcryptjs.genSalt(10);
    // 对明文加密
    const passwords=await bcryptjs.hash('123456',salt);
    let user=await User.create({
       username:"zhangsan",
      email:'itheima@itcast.cn',
      password:passwords,
      role:'admin',
      state:0
    })

}

// createuser();

const validateUser=(user)=>{
  const schema = {
		username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
		email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
		role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
		state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user,schema);
}

// 将用户集合作为模块成员进行导出   es6中键值相同可以只写一个
module.exports={
    User,
    validateUser
}


