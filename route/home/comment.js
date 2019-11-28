const {Comment}=require('../../model/comment');
module.exports=(req,res)=>{
const{content,uid,aid}=req.body;

//将评论信息存入评论集合中
Comment.create({
    content:content,
    uid:uid,
    aid:aid,
    time:new Date()

});
//重定向回文章详情界面
res.redirect('/home/article?id='+ aid);
    // res.send(req.body)
}