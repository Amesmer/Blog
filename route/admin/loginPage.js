const{User}=require('../../model/user')
const bcryptjs=require('bcryptjs');

module.exports=async(req,res)=>{
    //接收参数
    let {email,password}=req.body;

    if(email.trim().length==0||password.trim().length==0){
        // 响应一个错误提示页  并阻止代码向下执行
        return res.status(400).render('admin/error',{msg:'邮箱或密码错误'});
        
    }

    let user=await User.findOne({email});
    // 查询到用户
    if(user){
        //用户存在
        let isvalid=await bcryptjs.compare(password,user.password)
        if(isvalid){
            // 将用户名储存到session中
            req.session.username=user.username;
            //用户角色存储到session对象中
            req.session.role=user.role;
            // 将用户对象储存到模板公共对象中
            req.app.locals.userInfo=user;
            // 对用户身份进行判断
            if(user.role=='admin'){
                //重定向到用户列表页面
                res.redirect('/admin/user')
            }else{
                res.redirect('/home')
            }
        
        }else{
            //用户不存在
            return res.status(400).render('admin/error',{msg:'密码错误'});
        }
    }else{
        //没有查询到用户 
        return res.status(400).render('admin/error',{msg:'没有查询到用户'});
    }
   
}