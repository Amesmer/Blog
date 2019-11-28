const bcryptjs=require('bcryptjs');


async function run(){
    // 生成盐
    const salt =await bcryptjs.genSalt(10);
    // 对明文加密
    const result=await bcryptjs.hash('123456',salt);
    console.log(result);
    
}
run();
