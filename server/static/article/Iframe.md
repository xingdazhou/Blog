# iframe

iframe用于引入其他页面，如果引入过多其他的页面的话，要全部等到他加载完成之后才触发onload
iframe 的巧用（w3School 里面的代码在线编辑器）就是用到了iframe引入页面来实现，还有用于tab切换页（
这个会看起来比较卡顿）
iframe 的 src 引入文件是异步加载的

### 如何获取子窗口的window对象

```js
    //假设有一个主页面.html 和一个 子页面.html 并且子页面里面有一个a变量
    var oIframe = document.getElementsByTagName('iframe')[0];
    oIframe.contentWindow.a     //本想是打印子窗口里面的a，但是iframe是异步加载的，还没加载完，所以打印undefined

    oIframe.onload = function(){
        oIframe.contentWindow.a;  //正常输出a的值
    }


    //如果想在子窗口里面引用父窗口的变量的值，要在子窗口通过 window.parent.num 来获取num的值
    window.parent  // 找到的是父窗口的 window
    window.top     //找到的是顶级窗口的 window


```

父窗口向子窗口传值：
用a标签做锚点时，点击a标签之后url地址栏上后面多了一个#XXX（xxx是id的值），这样的#xxx叫做哈希值，它不刷新页面
上面的方法进行页面之间的传值需要通过一个服务器
但是第二种方法是通过拼接一个hash值到url上面，然后通过子页面的window.location.hash 就可以获取到这个地址最后的#hash值
子窗口向父窗口传值：
通过 windo.name ，把要向父窗口传输的值写在window.name上，但是不可以直接由父窗口去拿取这个值，因为不同源，请求不到数据，
当子页面把值写到window.name 上的时候，父页面要取到这个值就需要一个与这个子页面同源的页面来间接操作。

简单来说就是一个页面嵌入了一个不同源的子页面，然后子页面把值放在了window.name上面，然后在更换这个iframe 的src的值，吧它改变为与父窗口
同源的页面，然就父窗口就可有通过oIframe.contentWindow.name 把这个值获取到