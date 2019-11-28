const guard= (req,res,next)=>{
    //地址不为 /login  与   地址不为空
    if(req.url !='/login'&& !req.session.username){
     res.redirect('/admin/login');
    }else{
        //用户角色判断
        if(req.session.role=='normal'){
            return res.redirect('/home')
        }
        next();  
        
    }
}

module.exports=guard;