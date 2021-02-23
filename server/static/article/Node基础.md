# Nodejs

Nodejs最擅长高并发: Nodejs 最擅长的就是处理高并发，在Java、PHP 或者.net等
服务器端语言中，会为每-一个客户端连接创建一-个新的线程。而每个线程需要耗费大约2MB
内存。也就是说，理论上，一个8GB内存的服务器可以同时连接的最大用户数为4000个左
右。要让Web应用程序支持更多的用户，就需要增加服务器的数量，而Web应用程序的硬件
成本当然就上升了。Node. js不为每个客户连接创建一一个 新的线程，而仅仅使用一一个线程。
当有用户连接了，就触发-一个内部事件，通过非阻塞I/0、事件驱动机制，让Node. js程序
宏观上也是并行的。使用Node.js,一-个8GB内存的服务器，可以同时处理超过4万用户的
连接。





### http模块响应乱码解决

```JS
//返回状态码是200，文件类型是html，字符集是utf-8
res.writeHead(200,{"Content-type":"text/html,charset='utf-8'"})

//再设置返回的html的头上加上
res.write("<head><meta charset='UTF-8'></head>")
```



### request会请求两次，一次是页面，一次是ico图标

request.url 是包括 / 后面的所有内容

通过url模块可以解析url的内容

```js
C:\Users\zxd>node
> var url = require('url')
undefined
> url.parse('https://www.baidu.com?a=xxx')
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?a=xxx',
  query: 'a=xxx',
  pathname: '/',
  path: '/?a=xxx',
  href: 'https://www.baidu.com/?a=xxx' }

//后面传入true的话会把内容解析为对象
> url.parse('https://www.baidu.com?a=xxx',true)
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?a=xxx',
  query: [Object: null prototype] { a: 'xxx' },
  pathname: '/',
  path: '/?a=xxx',
  href: 'https://www.baidu.com/?a=xxx' }
>    
```

**CommonJS就是模块化的标准，nodejs 就是CommonJS (模块化)的实现。**



module.exports = xxx 和 exports.zzz= xxx 都是用于暴露模块，

module.exports = xxx  暴露后，引入时就是这个这个xxx

exports=xxx 暴露后，引入时会把这个xxx包装在一个对象里

require用于引入模块



### 放在node_modules目录下的模块可以直接引入

比如一个模块axios放在node_modules目录下，就可以直接这样写

`const axios = require('axios')` 

nodejs默认会找node_modules对应模块下的index.js

如果没有index.js但是想像上面一样的引入，则可以在对应模块目录下生成一个package.json文件,nodejs也会找里面的main字段入口



### 格式化日期的npm包

`npm i silly-datetime --save`



`npm list`命令可以查看下载了哪些依赖包

`npm info` 可以查看一个包的信息如：`npm info jquery`

`npm install 包名@版本号` 可以指定安装想要的版本的包



### package.json里面的版本号信息

^ :表示第一位版本号不变，下次通过`npm i`的时候后面两位取最新

~：表示前面两位不变最后一位取最新

*：表示全部取最新





### fs模块

```js
//通过fs模块查看是文件还是目录
const fs = require('fs')
fs.stat('./package.json',(err,data)=>{
    if(err) throw err;
    console.log(`是文件：${data.isFile()}`)  //true
    console.log(`是目录：${data.isDirectory()}`)  //false
    
})


//通过fs模块创建目录如：当前目录创建css目录 ，重复创建会报错
fs.mkdir('./css',(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('创建成功')
})


//通过writeFile()方法创建并写入文件，重复创建写入会替换
fs.writeFile('./html/index.html','hello world',(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('创建并写入文件成功')
})


//fs.appendFile()方法类似 是向文件中追加内容

//fs.readFile()的使用
fs.readFile('./css','utf-8',(err,data)=>{
    console.log(data)
})

//fs.readDir 读取目录下的文件和子文件夹
fs.readDir('./html',(err,data)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log(data)
})

//fs.rename 重命名 还有移动文件的功能
//重命名
fs.rename('./aaa.css','./index.css',()=>{
    if(err){
        console.log(err)
        return 
    }
    console.log('重命名成功')
})

//移动文件
fs.rename('./css/aaa.css','./html/aaa.css',()=>{
    if(err){
        console.log(err)
        return 
    }
    console.log('移动文件成功')
})

//fs.unlink 删除文件
fs.unlink('./aaa/index.html',(err)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log('删除文件成功')
})


//fs.rmdir 删除目录  这个方法只能删除空文件夹
fs.rmdir('./aaa',(err)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log('删除目录成功')
})
```



### promise

```js
//以前处理异步,传回调
function getData(callback){
    setTimeout(()=>{
        var name = '张三';
        callback(name)
    },1000)
}
getData(function(name){console.log(name)}) //1秒后打印张三

//用promise写法
var p = new Promise((resolve,reject){
            setTimeout(()=>{
    		var name = "张三";
    		resolve(name)
			},1000)                    
})
p.then((data)=>{
    console.log(data)
})
```

### async  await

**async**	用于声明一个异步的function，而await用于等待一个异步方法执行完成。

简单理解 

async 是让方法变成异步

await 是等待异步方法执行完成

可以在任何方法前面加上async， 那么此方法就是异步方法

```js
async function test(){
    return 'nodejs'
}
console.log(test()) //Promise{'nodejs'} 返回的是promise
```



## 数据库

1.分类
  文件型：简单——access、sqlite
  关系型：MySQL、Oracle
  分布式：mongoDB
  NoSQL：memcache、redis

2.安全性
  注入

3.操作
  管理性
  增删改查

主键：
1.不重复
2.性能最高

SQL——4大语句
增 INSERT
  INSERT INTO <表> (字段, ...) VALUES(值, ...);
  INSERT INTO user_table (username, password) VALUES('lisi', '111111');

删 DELETE
  DELETE FROM <表> WHERE 条件;
  DELETE FROM user_table WHERE ID=2;

改 UPDATE
  UPDATE <表> SET 字段=新值,字段=新值,... WHERE 条件;
  UPDATE user_table SET password='654321', username='blue2' WHERE ID=1;

查 SELECT
  SELECT 字段列表 FROM <表> WHERE 条件 ORDER BY 字段 LIMIT 30,30;

### Mongodb

安装

b站教程  https://www.bilibili.com/video/BV11t411k79h?p=18

创建数据库，直接使用 use

> use hero
> switched to db hero 

如果这个数据库不存在，则插入数据后就会直接创建好数据库

```
> use hero
switched to db hero
> db.user.insert({"name":"周兴达","sex":"男","age":"22"})
> db.collections
hero.collections
> db.user.find()
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }
```

删除数据库

```
> show dbs
admin   0.000GB
config  0.000GB
heros   0.000GB
local   0.000GB
test    0.000GB
> use heros
switched to db heros
> db.dropDatabase()
{ "dropped" : "heros", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
```

删除集合

```
db.user.drop()

```

查询 age>=13 的记录

```
db.user.find({age:{$gte:13}})


//age>13
db.user.find({age:{$gt:13}})

//age<13
db.user.find({age:{$lt:13}})

//  23<=age<=26
db.user.find({age:{$gte:23,$lte:26}})
```

模糊查找

```
//比如查找以zhang开头的名字的记录
db.user.find({name:/^zhang/})
```

多个条件查询

```
db.user.fing({name:"zhangsan",age:“18”})
```

查询前五条数据

```js
db.user.fing().limit(5);
```

查询10条以后的数据

```
db.user.find().skip(10)
```

指定列查询

```
> db.user.find()
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩", "sex" : "女", "age" : "18" }
> db.user.find({})
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩", "sex" : "女", "age" : "18" }
> db.user.find({},{name:1})
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达" }
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩" }
```

查询结果排序显示

```
//1升序
> db.user.find().sort({age:1})
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩", "sex" : "女", "age" : "18" }
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }

//-1降序
> db.user.find().sort({age:-1})
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩", "sex" : "女", "age" : "18" }
```

统计数据

```
db.user.find().count()
```

分页的话

```
db.user.find().skip((page-1)*pageSize).limit(pageSize)
```

or查询

```
> db.user.find({$or:[{name:"周兴达"},{name:"倩倩"}]})
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周兴达", "sex" : "男", "age" : "22" }
{ "_id" : ObjectId("5f028ba6c365aa5e43ec0749"), "name" : "倩倩", "sex" : "女", "age" : "18" }
>

```

查找第一条数据

```
db.user.findOne()
```

统计（条件）个数

```
db.user.find({age:{$gt:20}}).count()
```

修改记录

```
> db.user.update({name:"周兴达"},{$set:{name:"周棋洛"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("5f01e2f7c365aa5e43ec0748"), "name" : "周棋洛", "sex" : "男", "age" : "22" }

/批量修改，查到的数据不止一条，然后批量修改
db.user.update({age:14},{$set:{sex:"男"}},{multi:true})

//这里注意不写$set的话就是直接用后面的数据替换掉查询出来的记录
```

删除记录

```
> db.user.remove({name:"周棋洛"})
WriteResult({ "nRemoved" : 1 })
```



### 添加索引

如果数据量比较大，并且查询某一字段的频率比较高，就可以为该字段添加索引，这样能优化查询，极大缩短查询时间。

```
db.user.ensureIndex({"username":1})

//下次查询 db.user.find({username:"周棋洛"}) 时耗时更短

//删除索引
db.user.dropIndex({"username":1})
```

mongo4.x之后的版本开机后会自启动。services.msc可打开服务查看



## nodejs操作mongodb

```js
//1.安装  npm install mongodb -S

//2.引入mongodb
const {MongoClient} = require('mongodb')
//3.定义数据库的连接地址
const url = 'mongodb://127.0.0.1:27017'
//4.定义要操作的数据库
const dbName = 'hero'
//5.实例化MongoClient 传入数据库连接地址
const client = new MongoClient(url,{ useUnifiedTopology: true })
//6.链接数据库
client.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功')
    //切换数据库
    let db = client.db(dbName)

    //7.操作数据库完毕之后关闭连接
    client.close()
})

```



```js
//1.安装  npm install mongodb -S

//2.引入mongodb
const {MongoClient} = require('mongodb')
//3.定义数据库的连接地址
const url = 'mongodb://127.0.0.1:27017'
//4.定义要操作的数据库
const dbName = 'hero'
//5.实例化MongoClient 传入数据库连接地址
const client = new MongoClient(url,{ useUnifiedTopology: true })
//6.链接数据库
client.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功')
    //切换数据库
    let db = client.db(dbName)

    //查找数据
    db.collection('user').find().toArray((err,data)=>{
        console.log(data)

         //7.操作数据库完毕之后关闭连接,这里是异步的，所以就直接在回调中关闭
        client.close()
    })

    //增加数据
    db.collection('user').insertOne({username:"nodejs与mongodb",age:10},(err,result)=>{
        if(err) throw err
        console.log('增加成功')
        console.log(result)
        client.close()
    })
    
     //修改数据
     db.collection('user').updateOne({username:"nodejs与mongodb"},{$set:{age:1111}},(err,result)=>{
        if(err) throw err
        console.log('修改成功')
        console.log(result)
        client.close()
    })
    //删除记录
    db.collection('user').deleteOne({username:'nodejs与mongodb'},(err,result)=>{
        if(err) throw err
        console.log('删除成功')
        console.log(result)
        client.close()
    })
    //删除多条记录
    db.collection('user').deleteMany({name:'周棋洛'},(err,result)=>{
            if(err) throw err
            console.log('删除成功')
            console.log(result)
            client.close()
        })
   
})
```

#### 一般在函数里面创建client，然后释放对应的client

```js
MongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    ...
    client.close()
})
```

