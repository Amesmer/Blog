const{User}=require('../../model/user')

module.exports=async(req,res)=>{
    //标识  当前访问的是用户管理页面
    req.app.locals.currentLink='user';

    //接收客户端传递过来的当前页参数   没有就是第一页
    let page =req.query.page||1;
    //每一页显示的数据条数
    let pagesize=10;
    // 查询用户数据的总数
    let count=await User.countDocuments({});
    //总页数
    let total=Math.ceil(count/pagesize);

    //   页码对应开始的位置
    let  start =(page-1)*pagesize;
    // 查询所有的用户信息
    const users=await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user',{
        users:users,
        page:page,
        total:total
    })
}

