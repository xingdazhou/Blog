# jQuery

```html``` 取值取一个
```text```取值取全部
``` attr ``` 设置属性和取属性值
``` addClass`` 给jQuery对象添加class属性
``` removeClass``` 给对象删除class属性，不写属性的话就会删除掉全部class属性值 

常用的jquery添加class值

```js
     //给索引能被3整除的 li 添加上一个class值，没有被3整除的添加另一个class值
     $('li').addClass(function(index){
            if(index % 3 === 0){
                return "li-3";
            }else{
                return "no-li-3";
            }
     })

```

常用的把某个dom对象插入到某个dom对象的前面

```js
    //标准格式
    $('.box2').insertBefore($('.box1'));
    //也可以这样写
    $('.box2').insertBefore('.box1');   //这个方法返回的对象是box2


    //另一个方法
    $('.box1').before($('.box2'))  //这个方法返回的对象是box1
    //两个方法实现的功能相同但是返回的dom对象不同
```

常用的把某个dom对象插入到某个dom对象的里面的最后一个

```js
    //方法一
    $('.box1').appendTo($('.wrapper'));   //返回的是box1对象

    //方法二
    $($('.wrapper')).append($('.box1'))    //返回的是wrapper对象，内部用的是js的   父节点.appendChild（子节点）;

```

常用的把某个dom对象插入到某个dom对象的里面的最前一个

```js
    //方法一
    $('.box1').prependTo($('.wrapper'));   //返回的是box1对象

    //方法二
    $($('.wrapper')).prepend($('.box1'))    //返回的是wrapper对象，内部用的是js的   父节点.appendChild（子节点）;

```

jquery用 on 进行对事件的监听(可以链式调用且不覆盖)

```js
    $('.box1').on('mousedown',function(){
        console.log("mousedown");
    }).on('mousedown',function(){
        console.log("mousedown1");     
    })                //输出mousedown和mousedown1


    //如果只给他绑定多个不同的方法的话可以这样写
    $('.box1').on({
        mousedown : function (){
            console.log(1);
        },
        mousedown : function(){
            console.log(2);
        },
        mouseup : function (){
            console.log(3);
        }
    })          //按一个键输出 2 和 3，因为第一个函数被覆盖了，on 里面传的是对象，键值对，后面覆盖了前面的方法



    var obj = {
        name:"zhouxingda",
        age:21
    }
    $('.box1').on('mousedown',obj,function(e){  //在jquery里面可以往事件里面传参数，这个obj就被传到了事件对象e的data里面去了
        console.log(e.data);    //Object{name : "zhouxingda",age : 21}    
    })  


    //下面的绑定事件类似于js的事件委托,新插入的li也会有事件
    //通过事件委托的方式，点击每个li冒泡到ul上面，使li执行了这个事件
    $('ul').on('click','li'，obj,function(e){
        console.log(e.data);    //点击每个li都会输出 Object{name : "zhouxingda",age : 21}  
    })

    //这样写后，新插入的li不会有事件
    $('ul li').on('click',obj,function(e){
        console.log(e.data);    
    })
    $('<li></li>').appendTo($('ul'));

```


解除事件

```js
    $('.box1').on('mousedown',function(){
        console.log("mousedown");
    }).on('mousedown',function(){
        console.log("mousedown1");     
    })  

    $('.box1').off();   //这样是解除掉这个dom绑定的所有事件
    $('.box1').offf('mousedown1')  //传递的参数代表解除指定的事件

    //这个off解绑特殊的绑定的是时候要特别注意，怎么特殊绑，就怎么特殊解

    function fun1(){
        console.log(1);
    }
    function fun2(){
        console.log(2);
    }
    $('ul')
             .on('mousedown','li:odd',fun1)
             .on('mouseup',fun2);
    //解绑
    $('ul').off('mousedown','li:odd',fun1);

    
```

移除dom结构

```js
   $('.box1').remove();
   //或者
   $('.box1').detach();

   //区别
   //用remove删除的就会连绑定的事件也删除了，用detach删除的会保留原来的事件


```

在jquery里面this指的是原生的dom对象，原生的dom对象不可以用jquery里的函数，救需要用 $(this) 来返回一个jquery对象

$('<li></li>')   这就创建了一个li标签
$('<li></li>').appendTo($('.ul'))   就表示创建了一个li标签插入到了ul里面去了

复习js里面阻止默认事件```e.preventDefault()
复习js里面阻止冒泡  ```e.stopPropagetion()

jQuery里面阻止默认事件用 return false，也同时可以阻止冒泡


一般我们都要阻止form表单的默认事件。

```js
    //阻止form里面的button的默认事件，jquery写法
    $('button').on('click',function(){
        console.log($('form').serialize());      //这个方法会把form表单里面的input框的值拼接成一个字符串
                                                //如username=zhouxinda&password=123
        return false;
    })

    serializeArray   用于串联数据为一个数组，里面是一个个对象，对象里面是一个键值对


```

one用来只注册一次事件，如果是点击事件的话，点击完就没有了，on是每次点击都会注册事件，某些情况下可以用one来只注册一次事件，节省性能
one的写法和on的写法是一样的


jquery方法
.parent()方法找的是他的直接父级
.parents()方法找的是他上边的所有父级
.offsetParent()方法找的是他上边的第一个有定位的父级，没有就一直找到就是html

还可以在里面写参数
如

```js
        $('.box').parents('.box');   //就会在找到所有的父级当中挑选class值为box的父级返回

```


.wrap()方法用于给一个dom节点包裹上一个节点（慎用）

.end 方法（回退）

```js
    //假如body里面有一个ul且里面有很多li
    $('ul').find('li').eq(2),css('background','red').end().css('background','green');  
```

.siblings() 返回这个dom节点的所有兄弟节点
.prevAll()  返回当前元素的上面的所有兄弟节点
.nextAll()  返回当前元素的下面的所有兄弟节点 


.clone()   用jquery对象调用返回的是一个与该dom节点一样的节点

```js
    var oDemo = $('div.#demo').clone();   //返回一个与 <div>ddd</div> 一样的节点
    $('body').append(oDemo);            //这样就会在页面上显示两排的两个 ddd

    //但是这样的克隆是浅克隆，即只克隆了结构，如果原节点有绑定事件的话，这样写不会被克隆到新节点上

    //解决深克隆就是要在克隆函数里面传参为 true
    $('div.#demo').on('click',function(){
        console.log(777);

    }) 
    var oDemo = $('div.#demo').clone(true);
    $('body').append(oDemo);        //这样在页面上点击新克隆出来的节点也会触发事件，输出777

```

.add()  选中A和B集中操作

```js
    //比如用于给在选中给一系列节点设置样式的时候同时给这个选中的节点也添加上这种样式
    $('div.demo1').add('div.demo2').css({
        width:100,
        height:100
    })


```

jquery对象.animate()  方法的使用

```js
    <style>
        #demo{
            position:absolute;
            width:100px;
            height:100px;
            background:red;
        }
    </style>


    <div id = "demo"></div>


    $('#demo').animate({
        width:200,
        height:200,
        background:green
    })          //这样在页面上展现的是一个过渡的动画， 效果是它里面设置的属性值都是从原始属性渐变到这个新属性的值

    //这个方法的第二个参数是动画效果过渡的时间
    //方法的第三个参数是速率，‘linear’表示匀速，这里要用到其他的速率的话就要引入easing这个库文件
    //第四个参数是一个回调函数，即执行完这个函数后运行这个函数  

    .stop()   //暂停当前这个动画，根据参数不同执行效果不同
    //假如上面的div有动画效果
     $('#demo').animate({
        width:200,
        height:200,
        background:green,
        left:200,
        top:300
    },5000,'easeInOutBounce').animate({
        width:100,
        height:100,
         left:0,
         top:0
    },3000) 

    //给页面绑定点击事件，点击页面之后停止动画执行
    $('document').on('click',function(){
        $('#demo').stop ();    //stop()里面不传参数的话就会停掉当前的动画然后继续执行后序动画
        $('#demo').stop (true);     //里面有一个参数时，点击页面，这个动画立即停止
        $('#demo').stop (true,true);         //里面有两个参数时，点击页面这个动画立即执行完当前动画，到达当前动画的最终位置后面的动画就不执行了
    })


    .finish()  //立即执行完当前动画到达最终的位置

    .delay()  //在动画执行过程中，想在某个动画和后一个动画之间有个延时的效果，就用到delay（）方法

```

.trigger()  用来触发自定义事件，也可以触发系统的事件

```js
    $("div").on('eat',function(){
        console.log('banana');
    })
    $('div').trigger('eat');     //自定义的事件要用trigger函数来触发
    //这个trigger函数会导致冒泡，比如给ul和里面的里绑定了不同事件，用trigger来触发li的事件，会导致ul的事件也执行



    //下面是一个小demo
    <style>
        .demo{
            width:100px;
            height:100px;
            background:red;
        }
    </style>


    <div>变大</div>
    <button>变大1</button>
    <button>变大2</button>


    <script>
        $('div').on('bigOne',function(){
            $('div').css({width:$('div').width() + 50});
        })
        $('div').on('bigTwo',function(){
            $('div').css({width:$('div').width() + 100});
        })
        $('div').on('change',funcdtion(){
            $('div').css({width:800})
        })
        $('button:eq(0)').on('click',function(){
            if($('div').width() >= 300){
                $('div').trigger('change');
            }else{
                $('div').trigger('bigOne');
            }
        })
         $('button:eq(1)').on('click',function(){
            if($('div').width() >= 300){
                $('div').trigger('change');
            }else{
                $('div').trigger('bigTwo');
            }
        })
        //这个功能主要是实现点击第一个按钮，这个div变大一个小的宽度，点击第二个按钮变大一个大一点的宽度然后click事件时系统的，bigOng 和 bigTwo两个事件都是自己写的然后当点击按钮后执行回调函数，通过trigger来触发这两个事件

        //这个自定义事件可以传递一个参数，比如上面的如果不想把这个数值写死的话就传递一个变量

        $('div').on('bigOne',function(e,data){
            $('div').css({width:$('div').width() + data});
        })
         $('button:eq(1)').on('click',function(){
            if($('div').width() >= 300){
                $('div').trigger('change',100);
            }else{
                $('div').trigger('bigTwo');
            }
        })


    </script>


```

上面写的这些都是一些实例方法，就是通过选出来这个jquery对象然后调用一系列方法

---------------------------------------------------------------

下面的这些就是一些工具方法，即直接用 $ 来进行调用方法
$.trim(str)   //这是去除字符串左边和右边的空格
$.proxy()    //改变this指向，第一个参数是目标函数名，第二个参数是函数里面的this要指向的目标名

```js
    var obj = {
        name:'zhouxingda',
        age:21,
        techang:function(){
            console.log('dance');
        }
    }
    function aa(){
        console.log(this);
    }
     var bb = $.proxy(aa,obj);   //这里返回来一个新的函数
     bb();    //打印的这个this是一个对象，对象里面有name和age属性,还有一个函数

    //第二种用法
    var cc = $.proxy(obj,'techang');
    cc();     //输出dance，虽然这个看起来没多大用处，但是如果用于解决拖拽事件返回的对象时就很有用
            //比 如下面的拖拽
    <styke>
        div{
            position:absolute;
            height:100px;
            width:100px;
            background:red;
            top:0;
            left:0;
        }

    </style>
    <div>用于拖拽</div>

    <script>
            $('div').on('mousedown',function(e){
                var disX = e.pageX - $('div').offset().left;
                var disY = e.pageY - $('div').offset().top;
                //this--->div  这里的this指向的是这个div
                $('document').on('mousemove',$.proxy(function(e){
                    //this---->document

                    //经过$.proxy之后this指向了这个div
                    var newT = e.pageX - disY;
                    var newL = e.pagey - disY;
                    $(this).css({left:newL,top:newT});
                },this))
                $('document').on('mouseup',function(){
                    //this----->document
                    $('document').off();
                } )
            })
    
    </script>

```

防止变量冲突
$.noConflict()

```js
    var zhouxingda = $.noConflict();
    console.log(zhouxingda.('div'));   //可以找到这个div    
    console.log($('div'));   //现在用 $ 就会报错，它不在是一个方法

```

把一个json格式的字符串转化为一个json格式的对象
$.parseJSON()

```js
    var json = '{"name":"zhouxingda","age":21}';
    console.log($.parseJSON(json))  //Object  {name:"zhouxingda", age:21}


```

把一个类数组转化为一个数组 
$.makeArray

```js
    var arrFalse = {
        length:0
    }
    console.log($.makeArray(arrFalse));     //他的__proto__指向的是Array    

```


自定义一些工具方法
$.extend()

```js
    $.entend({
        aa : function(){
            console.log('aa');
        }
    })

    $.aa();    //打印出 aa

```

自定义一些实例方法
$.fn.extend()

```js
    $.fn.extend({
           drag:function(){
        //this----->jQuery对象
        this.on('mousedown',function(e){
            var disX = e.pageX - $(this).offset().left;
            var disY = e.pageY - $(this).offset().top;
            
            $('document').on('mousemove',$.proxy(function(e){
                 var newL = e.pageX - disX;
                 var newT = e.pageY - disY;
                $('this').css({left:newL,top:newT});
            },this))
            $ ('document').on('mouseup',function(){
                $(document).off();
            })
        })
      }
    })
   
   $('div').drag();


```

jQuery的ajax函数

```js
    $.ajax({
        type:'GET',
        url:'getNews.php',
        data:'',
        success:function(data){     //成功的回调函数
            console.log(data);
        },
        error:function(error){           //失败的回调函数
                console.log(error);
        }
    })
    //像上面这样写就会去发送一个ajax请求，成功和失败都是执行相对应的函数

    //如果你还要实现跨域的话就要写dataType='jsonp',并且crossDomain=true （其实写不写都能实现跨域）

```