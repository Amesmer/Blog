// 连接数据库
// 引入mongoose
const  mongoose =require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('database connect  success');
})
.catch(()=>{
    console.log('database connect  fail');
    
})

