const{User}=require('../../model/user')
module.exports=async(req,res)=>{
//    res.send('ok');
    // req.query.id
   await User.findOneAndDelete({_id:req.query.id});
   res.redirect('/admin/user')
   
}