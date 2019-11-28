
const {User,validateUser}=require('../../model/user');
const bcryptjs=require('bcryptjs')

module.exports=async(req,res,next)=>{
        //验证表单数据
  
    
    try{
        await validateUser(req.body);
    }catch(e){
    //    return res.redirect(`/admin/user-edit?message=${e.message}`);
    let obj={path:'/admin/user-edit',message:e.message};
    return next(JSON.stringify(obj));
    }

    // 验证邮箱是否被占用
    let user =await User.findOne({email:req.body.email});
    if(user){
        // return res.redirect('/admin/user-edit?message=邮箱已被占用')
        let obj={path:'/admin/user-edit',message:"邮箱已经被占用"};
        return next(JSON.stringify(obj));
    }

    // 对密码进行加密  生成随机字符串
    const salt=await bcryptjs.genSalt(10);
    // 加密
    const password=await bcryptjs.hash(req.body.password,salt);
    // 替换密码
    req.body.password=password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 跳转到用户列表页
    res.redirect('/admin/user');
}