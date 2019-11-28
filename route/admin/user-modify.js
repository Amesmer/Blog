const {User}=require('../../model/user')
const bcryptjs=require('bcryptjs')
module.exports=async(req,res,next)=>{
 //接收客户端传递的参数
 const {username,email,role,state,password}=req.body;
 //即将要修改的用户id 不在body里面 直接拼在url中的
 const id=req.query.id;

// res.send(body.password);
let user= await User.findOne({_id:id});
//密码比对
const isvalid= await bcryptjs.compare(password,user.password);
if(isvalid){
    //密码对比成功
    // res.send("success");
   await User.updateOne({_id:id},{
        username:username,
        email:email,
        role:role,
        state:state
    })
    res.redirect('/admin/user');
}else{
    //密码对比失败  给错误处理
    // res.send('error');
    let obj={path:'/admin/user-edit',message:'密码比对失败不能进行用户信息的修改',id:id}
    next(JSON.stringify(obj));
}


}