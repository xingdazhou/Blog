# 封装一个cookie的增删改查

```js
    var manageCookie = {
        setCookie : function(key,value,date){
            //增，改
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + date); 
            document.cookie = `${key}=${value};expires=${oDate}`;
            //document.cookie = key + ' = ' + value + ';expires=' + oDate; 
            return this;   //实现链式调用
        },
        removeCookie :function(key){
            //删
            this.setCookie(key,'', -1);
            return this;
        },
        getCookie : function(key,callback){
            //查
            var allCookie = document.cookie;
            var cookieArr = allCookie.split('; '); //把获取到的cookie拆分放到一个数组里面去   ['name = zhouxingda','age = 10']
            //下面在把每一项进行拆分匹配，这里可以用到正则表达式
            cookie.forEach(function(ele,callback){
                var item = ele.split('=');
                if(item[0] == key){
                    callback(item[1]);     
                }
            })
             return this;
            
        }
    }
    //里面都实现了链式调用

    manageCookie.setCookie('name','zhouxingda',3).setCookie('age','10',4).removeCookie('age');
    manageCookie.getCookie('age',cb);

    function(data){
        console.log(data); 
    }


```


拖拽函数

```js
    var dragFun = {
        init:function{
            this.dom = document.getElementById('demo');

            //在这里设置方块的 上一次的位置
            manageCookie.getCookie('position',function(data){
                if(data){
                    var dataArr = data.split('&');
                    oDemo.style.left = dataArr[0] + 'px';
                    oDemo.style.top = daraArr[1] + 'px';
                }
                
            })
                
            dragFun.bindEvent();

            
        }
        bindEvent:function(){
            this.dom.onmousedown = this.oDemoDown.bind(this); //在这里是谁触发这个函数this就指向谁，这里用.bind()来改变this为dragFun
            
        },
        oDemoDown:function(event){
            //注意这里this指向的是这个dom节点
            //需要用.bind()来改变一下这个this的指向
            this.disX = event.clientX - this.dom.offsetLeft;
            this.disY = event.clientY - this.dom.offsetTop;
            document.onmousemove = this.oDemoMove.bind(this);
            document.onmouseup = this.oDemoUp(this);
        },
        oDemoMove:function(){
           this.newL = event.clientX - this.disX;
            this.newT = enent.clientY - this.disY;

            this.dom.style.left = this.newL + 'px';
            this.dom.style.top = this.newT + 'px'; 
        },
        oDemoUp:function(){
            this.oDemoMove = null;
            this.oDemoUp = null;

            var positionStr = this.newL + '&' + this.newT;
            manageCookie.setCookie('position',positionStr,3);
        }

    }


```