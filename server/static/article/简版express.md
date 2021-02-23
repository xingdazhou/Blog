# node基础

### nodejs是什么？

nodejs是一个异步的事件驱动的JavaScript运行时。

https://nodejs.org/en/

类比学习运行时的概念

- JRE  java运行时环境
- C Runtime

比如C语言的文件需要先编译后执行，所以就有编译时和运行时两个概念

### nodejs特性

- 非阻塞IO
- 事件驱动

其实是这些都是js自己的特性



下一代是**deno**，底层是go语言，上一层是TS。go特性是（协程），类比js特性 （异步io）

### 与前端不同

- js核心语法不变
- 前端 操作 DOM BOM
- 后端 操作 模块 （fs，path，http，buffer，os，等）



执行：直接到js所在的文件夹下，如：node index.js 

但是为了调试方便 我们一般用 nodemon来执行nodejs文件 ，先得全局安装 ```node i nodemon -g```,当文件修改了会自动重启。



fs读取文件用异步promise，util是nodejs的核心模块，需引入。或者外层async，内部await

![image-20200605155218498](../assets/image-20200605155218498.png)

http 请求，一般会请求两次，一次是正常请求，第二次是浏览器自动请求获取favorite.ico

```js
//一般服务器出错的响应：
if(err){
    res.writeHead(500,{"Content-Type":"text/plain;charset=utf-8"})  //表示响应内容是普通文本。
    res.end("Server Error")
}
//没出错就执行下面的代码返回响应 
 res.statusCode = 200;
 res.setHeader("Content-Type","text/html")  //返回内容是html页面
 res.end(data);
//如果返回json数据接口的话，res.writeHead(200,{"Content-Type","application/json"})
//res.end(JSON.stringify({name:"tom"}))
```



### express

```npm  i  express  -S``` 

基本的例子

```js
const express = require("express")
const app = express()
//处理url路由
app.get("/",(req,res)=>{
    res.end("hello world")
})
app.get("/api",(req,res)=>{
    res.end(JSON.stringify({name:"tom"}))
})
app.listen(3000,()=>{
    console.log("server is running 3000 port")
})
```

#### 手写一个简版的express服务器实现上面的功能

```js
const express = require("myExpress")   //这里引入自己的myExpress
const app = express()
//处理url路由
app.get("/",(req,res)=>{
    res.end("hello world")
})
app.get("/api",(req,res)=>{
    res.end(JSON.stringify({name:"tom"}))
})
app.listen(3000,()=>{
    console.log("server is running 3000 port")
})


//新建一个文件 myExpress.js

const http = require('http')  //引入元素http模块
const url = require('url')   //引入url模块
const router = []			//创建一个路由数组,把get请求先保存起来，等到app.listen的时候在处理

class Application{
    get(path,handler){   //app.get调用会传入路由和回调函数
        router.push({
            path,
            method:'get',
            handler
        }),
            listen(){
            	const server = http.createServer((req,res)=>{    //创建原生了服务器
                const {pathname} = url.parse(req.url,true);
                for(var item of router){		//找出请求对应的router的路由，执行回调并返回
                    const {path,method,handler} = item
                    if(pathname === path && req.method.toLowerCase() === method){
                        return handler(req,res)
                    }
                }
            })
                server.listen(...arguments)
        }
    }
}

module.exports = function createApplication(){
    return new Application();
}


```





其实express就是实现了node.js的路由部分，让它不在用if，else来判断路由

