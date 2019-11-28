const express= require('express');
//处理路径
const path=require('path');
// 导入express-session模块 处理post请求
const session=  require('express-session');



//创建网站服务器
const app =express();

// database connect
require('./model/connect')

//创建user集合 
// require('./model/user');



// express框架模板所在位置  默认后缀
app.set('views',path.join(__dirname,'views'))
app.set('view engine','art');
// 渲染后缀为art的模板时  所使用的模板引擎是什么
app.engine('art',require('express-art-template'));
//
const template=require('art-template');
const  dateformat=require('dateformat');
template.defaults.imports.dateFormat=dateformat;



//配置session   
app.use(session({secret:'secret key',
        saveUninitialized:false,
        cookie:{
            maxAge:24*60*60*1000
        }

}));


// 处理post请求
const bodyPaser=require('body-parser');
// 拦截所有的请求
app.use(bodyPaser.urlencoded({extended:false}));

//开放静态资源文件
app.use(express.static(path.join(__dirname,"public")))


//拦截请求 判断用户是否是登录状态   提取函数到middleware
app.use('/admin',require('./middleware/loginGuard.js'))


// 引入路由模块
const home =require('./route/home');
const admin =require('./route/admin');

// 为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);


//定义一个错误处理中间件 
app.use((err,req,res,next)=>{
    //页面的跳转 携带错误信息
    const result=JSON.parse(err);
    let params=[];
    for(let attr in result){
        if(attr!='path'){
           params.push(attr+"="+result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('web server init success');

