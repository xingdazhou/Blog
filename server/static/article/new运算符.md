# new

new运算符：

1. 可以执行函数 
1. 自动创建一个空对象
1. 把创建的对象指向另外一个对象
1. 把空对象和函数里面的this衔接起来（this指向实例化对象）
1. 隐式返回this

### 1.可以执行函数

```js
function fn(){
    console.log('fn...')
}
new fn()  //打印  fn...
//new 的过程会把函数当成构造函数执行一遍
```

### 2.自动创建一个空对象

```js
//工厂模式 ===》 构造函数
function People(){
    let obj = {}
    obj.name = "张三"
    obj.hobby = function(){
        console.log("篮球")
    }
    return obj
}
var person = People()

//可以用new来执行
function People(){
    //let obj = {}   new会自动创建空对象，并且和this连接，可以理解this就是这个空对象
    this.name = '张三'
  //this.hobby = function(){
 // console.log("篮球")
  //}
   //return this  new会自动隐式返回this
}
People.prototype.hobby = function(){
    console.log('篮球')
}
var person = new People();
```

### 仿写new运算符

```js
function myNew(constructor,...args){
    let obj = {}
    constructor.call(obj,...args)
    obj.__proto__ = constructor.prototype
    return obj
}
var person = myNew(People)
```

