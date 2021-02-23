# JSON

网络数据传输的格式，前后端传输数据的格式
以前用的传输数据的格式是xml，现在用的是对象，这个对象用于传输数据就叫做json格式
json格式里面属性名必须加双引号，用于区别一般对象
JSON是一个静态类，类似Math，他有两个方法

- stringify   把json对象转换为json格式的字符串

```js
var obj = {
    "name" : "abc",
    "age" : 18
}
JSON.stringify(obj)   //"{"name":"abc","age":18}"

```

- parse   把json格式的字符串转换为对象

```js
var obj = {
    "name" : "abc",
    "age" : 18
}
var str = JSON.stringify(obj)   //"{"name":"abc","age":18}"
JSON.parse(str)       //{name:"abc",age:18}
```

###  domTree

先解析，再异步加载，深度解析
### cssTree
等domTree解析并加载完后，在解析cssTree
最后 domTree + cssTree = randerTree，
之后js渲染引擎开始渲染页面
如果通过js改变了domTree结构，即添加删除一个dom就会使得randerTree重新渲染，浪费效率
所以dom优化尽量避免dom节点的添加，删除等
把重新渲染randerTree的过程叫做重排（reflow），导致重排的原因有

-   dom的添加，删除
-   dom节点的宽高变化，位置变化，display->none->block
-   offsetWidth ,offsetLeft（因为要重排保证这个位置数据是时实的）

### 异步加载js
js的加载会阻断html和css的加载，因为js会修改HTML结构和css样式
但是有时候加载一些工具js没必要同步加载，因为如果过多工具js加载会使得页面空白等等

异步加载js的三种方式
他会使得与html，css同时去加载

```js
<script  src="tool.js" defer="defer"></script>
但是加载完后要等到dom文档解析完全才会执行，defer就是异步下载推迟执行的意思，只有IE能用
此外也可以把内部的js变成异步加载


<script  src="tool.js" aysnc="aysnc"></script>
W3c的标准方法，加载完就执行，且只能链接外部的js文件，ie9以上都可以用


第三种是创建scrip标签插入方式
<script>
var script = document.createElement("script");
    script.type="text/javascript";
    script.src = "tools.js";
    document.head.appendChild(script);
    // test();  报错

    如果要执行里面的方法的话要等待他加载完毕才可以，不然会报错方法未定义等。
    可以使用
    script.onload = function(){
        //兼容  safari chrome firefox opera
        test();
    }

    而ie使用的是状态码readyState
    它有两种状态，loading和complete（或者loaded）
    如果script.readyState = "loading" 表示正在加载
    如果script.readyState = "loaded"  表示加载完毕

    需要用一个方法来监听
    所以   
    script.onreadystatechange = function(){
        if(script.readyState == "loaded" || script.readyState = "complete"){
            test();
        }
    }
</script>

```

把上面的异步加载js封装成一个函数

```js
<script>

function loadScript(url,callback){
     var script = document.createElement("script");
    script.type="text/javascript";
    // script.src = url;
    if(script.readyState){
        //这里代码有缺陷，如果下载过快的话，script.onreadystatechange很可能一开始就最终状态，没有变化就不会触发该函数
                script.onreadystatechange = function(){
                if(script.readyState == "loaded" || script.readyState = "complete"){
                    callback();
                }
            }
    }else{
            script.onload = function(){
            //兼容  safari chrome firefox opera
            callback();
        }
    }
    script.src = url;  //先给绑定事件，在执行这个下载事件
    document.head.appendChild(script);
}


loadScript('demo.js',test)  //这样写的话test会因为demo.js没加载完bao报错未定义test。
loadScript('demo.js',function（）{test（）}) //这是最终写法
</script>
```

#### 打印文档解析并加载完成的过程

```js
<script>
console.log(document.readyState);   //loading
document.onreadystatechange(){
    console.log(document.readyState);   //interactive,complete
}
</script>
```

判断dom解析完全的一个函数 DOMcontentLoaded

```js
    document.addEventListener('DOMcontentLoaded',function(){
            //此时可以选中html结构里面的标签了
            var body = document.getElementsByTagName('body');
            console.log(body);
        },false)


        jQuery的 $(document).ready(function(){}) 也是这么实现的
```

