const express=require('express');


const admin=express.Router();

// 用户登录页面
admin.get('/login',require('./admin/login'));

// 用户界面
admin.get('/user', require('./admin/userPage'));

// 用户退出
admin.get('/logout',require('./admin/logout.js'))


// 用户登录请求
admin.post('/login',require('./admin/loginPage'));

//用户添加页面
admin.get('/user-edit',require('./admin/user-edit'))

//新增用户表单提交
admin.post('/user-edit',require('./admin/user-edit-fn'))
//用户修改
admin.post('/user-modify',require('./admin/user-modify'))
//用户删除
admin.get('/user-delete',require('./admin/user-delete'))
// 文章列表页
admin.get('/article',require('./admin/article'))
//文章编辑界面
admin.get('/article-edit',require('./admin/article-edit'))
//文章添加界面
admin.post('/article-add',require('./admin/article-add'))
//文章删除姐界面
admin.get('/article-delete',require('./admin/article-delete'))
module.exports=admin;