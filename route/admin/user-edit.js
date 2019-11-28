const {User }=require('../../model/user')

module.exports=async (req,res)=>{

    req.app.locals.currentLink='user';
    
    // 获取到地址栏中的id参数
    const {message ,id}=req.query;
    // 如果传递了id  说明是修改操作   
    if(id){
      let user= await User.findOne({_id:id})
      //渲染用户修改界面
      res.render('admin/user-edit',{
        message:message,
        user:user,
        link:'/admin/user-modify?id='+id,
        button:"修改"

    });
    }else{
        //添加操作
        res.render('admin/user-edit',{
            message:message,
           link:'/admin/user-edit',
           button:"添加"
        });
    }
   
}