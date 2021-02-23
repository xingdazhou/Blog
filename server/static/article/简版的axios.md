# 实现简版的axios

myaxios.js

```js
class Axios {
    constructor() {

    }
    //这个request相当于发送请求
    request(config) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            let {
                url = "", data = null, method = 'get', headers = {}
            } = config;
            xhr.open(method, url, true)
            xhr.onload = function () {
                // console.log(xhr.responseText)
                resolve(JSON.parse(xhr.responseText))
            }
            xhr.send(data)

        })


    }
}

let methodArr = ['get','post','put','delete','options','patch']

methodArr.forEach(method=>{
    Axios.prototype[method] = function(){
        return this.request
    }
})

function createInstance(){  //用这个方法来创建实例，就不用到客户端去创建实例了
    let context  = new Axios()
    let Instance = context.request
    return Instance
}

let axios = createInstance()
```

myaxios.html

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./myaxios.js"></script>
</head>
<body>
    <button onclick="sub()">点击我发送myaxios</button>
    <script>
        function sub(){
            // let axios = new Axios();
            // axios.request({
            //     url:'/myaxios'
            // }).then(res=>{
            //     console.log(res)
            // })
            axios({
                url:'/myaxios'

            }).then(res=>{
                console.log(res)
            })

            //还要实现axios.get()   axios.post()，需要给函数进行扩展
        }
    </script>
</body>
</html>
```

后端

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
router.get('/myaxios',ctx=>{
    let obj = {
        a:1,
        b:2,
        c:3
    }
    ctx.body = JSON.stringify(obj)
})

app.use(router.routes())


app.listen(3000)
```

