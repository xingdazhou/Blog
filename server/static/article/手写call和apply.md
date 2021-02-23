# 手写call实现

### 一般情况

```js
var value = 'window';
var obj = {
	value:'obj'
}
function show(){
    console.log(this.value);
}
show();    //window
show.call(obj);   //obj
show.call(null);   //window
```

### 原理 ：show.call(obj)  等价于 obj.show();

```js
// show.call(obj) 的原理就是三步
obj.show = show;
obj.show();
delete obj.show;

```

### 1. 实现call (newCall)

```js
var value = 'window';
var obj = {
       value:'obj'
	}
function show(age,name){
    console.log(this.value);
    return{
        age:age,
        name:name
     }
}

// 给函数原型添加一个newCall方法，之后每个函数都能使用这个方法
Function.prototype.newCall = function (){
       // 调用call的时候，参数不定，所以不用形参来接收
       var ctx = arguments[0] || window;   //解决传递null问题
       ctx.fn = this;
       var arr = Array.from(arguments);   //这里也可以通过字符串拼接在用eval执行，但是太麻烦
       arr.shift();
       var result = ctx.fn(...arr);    //如果没传参，返回undefined 和 call一样
       delete ctx.fn;
       return result;
}
console.log(show.call(obj,"zhouqiluo",21))   //obj  {age: "zhouqiluo", name: 21}
console.log(show.newCall(obj,'zhouxingda',22));   //obj  {age: "zhouxingda", name: 22}
```

### 2.实现apply（newApply）

```js
 Function.prototype.newApply = function (ctx,arr){
       var ctx = arguments[0] || window;   //解决传递null问题
       ctx.fn = this;
       //如果没传参，那么arr就是undefined，使用...arr就会报错，在数组或函数参数中使用展开语法时, 该语法		 //	只能用于 可迭代对象：
       //undefined is not iterable (cannot read property Symbol(Symbol.iterator))
       if(!arr){    
          var result = ctx.fn();
          delete ctx.fn;
           return result;
        }
       var result = ctx.fn(...arr);
       delete ctx.fn;
       return result;
}
console.log(show.apply(obj,["zhouqiluo",21]))   //obj  {age: "zhouqiluo", name: 21}
console.log(show.newApply(obj,["zhouxingda",22]))   //obj  {age: "zhouxingda", name: 22}
```

JS中哪些对象里实现了这个接口呢？常见的有Array，String，arguments，还有后面高级的数据结构，如Set，Map等。

关于**Symbol.iterator**  (可迭代对象)

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator