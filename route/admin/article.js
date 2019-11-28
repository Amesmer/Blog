//将文章集合的构造函数导入到当前文件中
const {Article}=require('../../model/article');
const pagination=require('mongoose-sex-page');

module.exports=async(req,res)=>{
    //公共模板属性
    req.app.locals.currentLink='article';
    //查询数据  
    const page =req.query.page||1;
   let articles=await pagination(Article).find().page(page).size(2).display(2).populate('author').exec();
// let articles=await Article.find().populate('author');


    
//
    res.render('admin/article',{
        articles:articles
    });
}


