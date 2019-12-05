const{Article}=require('../../model/article')
const{Comment}=require('../../model/comment')
module.exports=async(req,res)=>{
//    res.send('ok');
    // req.query.id
   await Article.findOneAndDelete({_id:req.query.id});
   await Comment.findOneAndDelete({_id:req.query.id});
   res.redirect('/admin/article')
   
}