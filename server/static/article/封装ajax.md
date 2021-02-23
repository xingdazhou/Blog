# Ajax

我们在地址栏输入一个地址，如www.baidu.com之后回去找到腾讯的服务器，然后该服务器返回一些资源来显示完整百度的页面，
之后浏览器就与服务器断开连接，如果需要请求资源就需要再次连接到百度服务器

ajax -----  asynchronous javascript and xml(json)  现在基本上都是以json对象的格式传输数据

典型应用 -- 谷歌地图
以前的地图用form表单做的，滑动地图时就会刷新整个页面，现在用来ajax后，滑动地图只刷新当前区域。

ajax传输数据的需要及步骤
1、浏览器
2、ajax对象
3、方法 open(method,url,true/false,)      true表示异步（不阻塞页面）
4、send()   调用ajax的sen（）d方法发送请求
5、readyState （onreadystatechange 函数来检测readyState的改变触发执行） 用于检测状态，值有 0,1,2,3，4
6、status （状态码） 是http头部的信息 status == 1xx,2xx,3xx,如 status == 404 4开头的是客户端的错误，5开头的是服务器那边的错误 ，如果是 status == 200 就代表可用


通过new一个XMLHttpRequest来创建一个ajax对象

```js
GET请求：

    var xml = new XMLHttpRequest();    //这是标准模式下的创建ajax对象，即ie之前的版本不好使
     new ActiveXObject("Microsoft.XMLHTTP")       //IE特有的是 new ActiveXObject("Microsoft.XMLHTTP")


     //兼容处理创建一个ajax对象叫xml
     //第一步
     var xml = null;
     var newDate = new Date();
     var timex = newDate.getTime();
     var data = "name=xxx&age=xxx" + timex;    //这里利用时间挫可以解决get请求独有的缓冲机制，即会去请求新的数据
     if(window.XMLHttpRequest){
         xml = new XMLHttpReques(); 
     }else{
         xml = new ActiveXObject("Microsoft.XMLHTTP") ; 
     }

    //第二步
    xml.open('GET','getNews.php?' + data,true);   //用get方式 通过true异步方式向getNews.php文件请求数据，这里第二个参数可以拼接请求的值

    //第三步
    xml.send();

    //第四步
    xml.onreadystatechange = function(){
        if(readyState == 4){
            if(xml.status == 200){
                // xml.responseText                 // responseText 获得字符串形式的响应数据 
                JSON.parse(xml.responseText);     //把从服务器返回来的字符串数据转化为json格式的对象
            }
        }
    }

    
---------------------------------------------------------------
POST请求：

var xml = new XMLHttpReques();    //这是标准模式下的创建ajax对象，即ie之前的版本不好使
     new ActiveXObject("Microsoft.XMLHTTP")       //IE特有的是 new ActiveXObject("Microsoft.XMLHTTP")


     //兼容处理创建一个ajax对象叫xml
     //第一步
     var xml = null;
     var data = "name=xxx&age=xxx"
     if(window.XMLHttpRequest){
         xml = new XMLHttpReques(); 
     }else{
         xml = new ActiveXObject("Microsoft.XMLHTTP") ; 
     }

    //第二步
    xml.open('POST','getNews.php',true);   //用get方式 通过true异步方式向getNews.php文件请求数据，这里第二个参数可以拼接请求的值

    //而通过post请求时，请求的值要放在xml.send()这个请求的括号里面而且还要在xml.send()前面要添加一句代码告诉内容类型

    xml.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 

    //第三步
    xml.send(data);

    //第四步
    xml.onreadystatechange = function(){
        if(readyState == 4){
            if(xml.status == 200){
                // xml.responseText                 // responseText 获得字符串形式的响应数据 
                JSON.parse(xml.responseText);     //把从服务器返回来的字符串数据转化为json格式的对象
            }
        }
    }


```

### 封装ajax的get请求和post请求为一个函数

```js
    var xml = null;

    function outcallback(data){
        console.log(data);
    }
     var data = "name=ccc&age=eeee";
    function ajax(method,url,flag,data,callback){    
            if(window.XMLHttpRequest){
                xml = new XMLHttpReques(); 
            }else{
                xml = new ActiveXObject("Microsoft.XMLHTTP") ; 
            }
            if(method == 'GET'){
                    xml.open(method,url = '?' + data,flag);
                    xml.send();
            }else{
                xml.open(method,url,flag);
                xml.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 
                 xml.send(data);
            }
            

            xml.onreadystatechange = function(){
                if(readyState == 4){
                    if(xml.status == 200){
                        callback(JSON.parse(xml.responseText)); 
                    }
                }
            }
	}



```

### 自己封装的ajax函数

```js
function ajax(method,url,callback,data,flag){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject();
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                callback(xhr.responseText);
            }else{
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    if(method == 'GET'){
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method,url+'?'+data+'&timer='+timer,flag);
        xhr.send();
    }else if(method == 'POST'){
        xhr.open(method,url,flag);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }
}
```

