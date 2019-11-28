//引入formidable 第三方模块
const formidable= require('formidable');
const path=require('path');

const {Article}=require('../../model/article')
module.exports=(req,res)=>{
    // res.send(req.body);   普通表单数据   文件数据是二进制内容
    const form=new formidable.IncomingForm();
    //配置上传文件的存放位置
    form.uploadDir=path.join(__dirname,'../','../','public','uploads');
    //保留上传文件的后缀
    form.keepExtensions=true;
    //4解析表单   插入表单数据到数据库
    form.parse(req,async(err,fields,files)=>{
        //err 错误对象  fields 对象类型保存普通表单数据   files对象类型保存了上传文件的信息

        // res.send(fields);
        fields.cover=files.cover.path.split('public')[1];
        // console.log(files.cover.path.split('public')[1]);
        
        await Article.create({
            title:fields.title,
            author:fields.author,
            cover:files.cover.path.split('public')[1],
            content:fields.content
        });
        res.redirect('/admin/article')
    })
}