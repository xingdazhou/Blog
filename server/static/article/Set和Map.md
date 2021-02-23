# ES6中的Map和Set

### 判断某一个属性在不在对象里面用 in

`console.log("c" in obj)`



### 对象的key值的构建

```js
let key = 'zxd'
let obj = {
    [key]:'周兴达'
}
console.log(obj)  //{zxd: "周兴达"}
//主要的是键是变化的，然后值是确定的
```



### 对象的合并

```js
let a = {a:'z'}
let b = {b:'x'}
let c = {c:'d'}
let d = Object.assign(a,b,c)
console.log(d)  //{a: "z", b: "x", c: "d"}

```

### set数据结构

```js
//set数据结构里面不能有重复的变量
let setArr = new Set(['zhou','xing','da'])
console.log(setArr)  //Set(3) {"zhou", "xing", "da"}
setArr.add('xing')
//{"zhou", "xing", "da"} 重复了就不能插入
setArr.add('xinga')
// {"zhou", "xing", "da", "xinga"}
setArr.has('xinga')
//true
setArr.delete('xinga')
//true  
console.log(setArr)
//{"zhou", "xing", "da"}

//setArr是个类数组，所以可以用Array.from转变为数组
//0: "zhou"
//1: "xing"
//2: "da"
//size: 3
Array.from(setArr)
//["zhou", "xing", "da"]
```

### 数组去重(查询一个页面用了多少中类型标签)

```js
document.all  //获取到页面所有标签，返回的是一个HTMLAllCollection

//如 查看淘宝页面使用了多少种标签
new Set(Array.from(document.all).map(item=>item.tagName)).size
//32
```

### map数据结构

```JS
var map = new Map()
map.set('zhouxingda',{a:1,b:2})
map.get('zhouxingda')
//{a: 1, b: 2}

//方法：set，get，has，delete，clear
```



