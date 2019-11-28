
const mongoose =require('mongoose');

const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:[true,'请填写']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请填写作者']
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }


})

//更具规则创建集合
const Article = mongoose.model('Article',articleSchema);

//导出
module.exports={
    Article
};