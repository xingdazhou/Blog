# Jsonp

利用script的src属性可以链接其他域的资源文件

需要前后端配合

客户端：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>点击我使用jsonp</button>
    <script>
        function say(res){
            console.log(res)
        }
        document.querySelector('button').onclick = function(){
            let s = document.createElement('script')
            s.src = 'http://localhost:3000/get?cb=say'
           document.body.appendChild(s)       
           document.body.removeChild(s)  
        }
    </script>
</body>
</html>
```

后端：

```js
const Koa = require('koa')
const static = require('koa-static')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()
app.use(static(__dirname+'/static'))

router.get('/get',(ctx,next)=>{
    let cb = ctx.query.cb   //拿到query查询参的值
    console.log(cb)
    let obj = {
        a:1,
        b:2,
        c:3
    }
    ctx.body = `${cb}(${JSON.stringify(obj)})`
})

app.use(router.routes())
app.listen(3000)
```



解决跨域的方式：

1. jsonp
1. cors
1. 后端代理（利用koa-server-http-proxy）