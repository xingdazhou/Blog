### instanceof原理，原型链

```js
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;
 L = L.__proto__;
 while (true) { 
   if (L === null) 
     return false; 
   if (O === L)  // 这里重点：当 O 严格等于 L 时，返回 true 
     return true; 
   L = L.__proto__; 
 } 
}
//规则简单来说就是 L的  __proto__  是不是强等于 R.prototype，不等于再找  L.__proto__ .__proto__  直到 __proto__ 为 null 
```

#### 实现一个Object.create()

```js
Object.create1 = function(obj){

var F = function(){};

F.prototype = obj;

return new F();

}

//调用
var obj1 = Object.create1(obj);
```

#### for in 会遍历原型链上的属性和方法

```js
function F(){
        this.a = 1;
        
    }
F.prototype.b = 2;
var a = new F();
for(var item in a){
  	if(a.hasOwnProperty(item))
   		console.log(item)   // a
}
```

