# ES6异步解决方案

### 背景

js中经常遇到异步处理任务，如：dom事件，ajax通讯，计时器

异步任务通常会使用回调模式callback处理

回调模式至少会遇到下面两个问题

没有统一的 标准

```js
dom.addEventListener('click',function(e){
    	//回调函数作为第二个参数传递，函数可接受一个参数
},false)
dom.onclick = function(e){
	//回调函数作为属性传递，函数可接受一个参数    
}
fs.readFile('./txt',function(err,data){
    //回调函数作为最后要一个参数传递，函数可接受两个参数
})

```

容易出现回调地狱

```js
//基于回调模式的等待函数
//异步函数
function delay(duration,callback){
    setTimeout(callback,duration)
}
//异步任务：等待1s输出1，然后在等待2s输出2，然后在等待3s输出3
delay(1000,()=>{
    console.log(1)
    delay(2000,()=>{
        console.log(2)
        delay(3000,()=>{
            console.log(3)
        })
    })
})
```

js社区出现了promise A+ 规范，希望把异步处理规范化

ES6中实现了promise A+规范，形成了统一的异步处理模型，它的 目的不是消除异步回调，而是：

1. 让异步任务中的回调函数规范化
1. 消除回调地狱



### ES6的异步处理模型

**es6将异步处理场景分为两个阶段和三种状态**

两个阶段：unsettled（未解决）和settled（已解决,已经完成）

三种状态：pending(挂起) ，resolved(完成)，rejected(失败）

unsettled===>pending

settled=====>resolved  or   rejected

### 阶段和状态的关系

1. 未决阶段

   当任务处于未决阶段时，它一定是pending挂起状态

   未决阶段表示任务正在进行中，但未完成

   比如一个网络通信的任务，网络完成了各种配置，也发送了请求，但是结果还没有拿到。

   比如一个等待任务，时间到达之前都处于未决阶段

1. 已决阶段

   当任务处于已决阶段时，它只能是resolved和rejected两种状态中的一种，resolved表示任务正常完成，rejected表示任务出现了错误的情况

   已决阶段表示任务已经有一个结果了。

   比如一个网络通信任务，从服务器拿到数据（resolved），网络不好没有拿到数据（rejected）

   比如一个等待任务，时间到达后就处于已决阶段的resolved状态

### 阶段的转换

**任务开始时，始终是未决阶段**

es6 认为，任务在未决阶段的时候，有能力将其推向已决阶段，比如，当从服务器拿到数据后，我们就从未决阶段推向已决的resolve状态，如果网络不好，导致出错，我们从未决阶段推向已决的rejected状态

我们把从未决推向已决的resolve状态的过程，叫做resolve，我们把从未决推向已决的rejected状态的过程，叫做rejected，

```js
unsettled ====>settled

				resolve
pending ======>
    			rejected

```

这种状态和阶段的变化是不可逆，一旦推向了已决，就无法重新改变状态

### 任务完成后附带的数据

任务从未决到已决时，可能附带一些数据，比如，跑步完成后的用时，网络请求后从服务器拿到的数据。

```js
unsettled ====>settled

				===>resolve(数据)
pending ======>
    			===>rejected（数据）
```

### 任务的后序处理

任务已决（有了结果后），可能需要进一步做后序处理，如果任务成功（resolved）,有后序处理，如果任务失败，（rejected），也有后序处理。

我们把针对resolved的后序处理，称为thenable，针对rejected的后序处理，称之为catchable

```js
unsettled            settled
		resolve(数据)
		============>resolve(数据) =====>thenable(数据)（函数处理）
pending
		rejected(数据)
		============>rejected(数据) =====>catchable(数据)（函数处理）
```



### Promise的基本使用

Promise是一个构造函数，通过new Promise()可以创建一个任务对象，构造函数的参数是一个函数，用于处理未决阶段的事务，该函数的执行是立即同步执行，在函数中，可以通过两个参数自主的在合适的时候将任务推向已决阶段

```js
var pro = new Promise((resolve,reject)=>{
    //未决阶段的代码，这些代码立即执行（这个函数体是同步执行的代码立即执行）
    //在合适的时候，将任务推向已决
    //resolve(数据),将任务推向resolved状态，并附带数据
    //reject(数据),将任务推向rejected状态，并附带数据
})

//比如：
var pro = new Promise((resolve,reject)=>{
    console.log('任务进行中。。。');
    setTimeout(()=>{
       resolve('over');     
    },1000)
})

//任务进行中。。。
//undefined

//1s后
//pro
//Promise {<resolved>: "over"}
//__proto__: Promise
//[[PromiseStatus]]: "resolved"
//[[PromiseValue]]: "over"
```



1. 任务一旦进入已决后，所有企图改变任务状态的代码都失效
1. 以下代码可以让任务到达rejected状态
   1. 调用reject
   1. 代码执行出错
   1. 抛出错误

```js


var pro = new Promise((resolve,reject)=>{
    console.log('任务进行中。。。');
    setTimeout(()=>{
       resolve('over');    
       reject('error'); //此代码无效
        console.log(123) //输出123
    },1000)
})

//自动reject()
var pro = new Promise((resolve,reject)=>{
    console.log('任务进行中。。。');
    var a = null;
    a.abc;
})
//或者抛出错误，自动reject（）
var pro = new Promise((resolve,reject)=>{
    console.log('任务进行中。。。');
    throw 'abc'
})
```

拿到Promise对象后，可以通过then方法指定后序处理

```js
pro.then(thenable,catchable)
//或
pro.then(thenable)
pro.catch(catchable)

//如：
var pro = new Promise((resolve,reject)=>{
    console.log('任务进行中。。。');
    setTimeout(()=>{
       resolve('over');    
       reject('error'); //此代码无效
        console.log(123) //输出123
    },1000)
})
pro.then(data=>{
    console.log('成功',data)
},err=>{
    console.log('失败',err)
})
//控制待输出结果
/*
任务进行中。。。
Promise {<pending>}__proto__: Promise
[[PromiseStatus]]: "resolved"
[[PromiseValue]]: undefined    这里1s后在会是over值
 123
 成功 over
*/
```

无论 是thenable还是catchable，均是下面格式的函数

```js
function(data){
    //data为状态数据
}
```

注意：**后续处理函数**一定是异步函数，并放到微任务队列中

thenable函数是要等resolve调用后才会被推入微任务队列。catchable函数要等到reject后在被推入微任务队列。

```js
var pro = new Promise((resolve,reject)=>{
    console.log(1);
    setTimeout(()=>{
		console.log(3)
    },1000)
})
console.log(2)
pro.then(data=>{
   console.log(4)
})
console.log(5)

//控制待输出  1,2,5,3

------------------------------------------------------------
var pro = new Promise((resolve,reject)=>{
    console.log(1);
    setTimeout(()=>{
        resolve();
		console.log(3)
    },1000)
})
console.log(2)
pro.then(data=>{
   console.log(4)
})
console.log(5)

//控制台输出  1,2,5,3,4

------------------------------------------------------------
var pro = new Promise((resolve,reject)=>{
    console.log(1);
    setTimeout(()=>{
        setTimeout(()=>{
            console.log(3)
        })
        resolve();
    },1000)
})
console.log(2)
pro.then(data=>{
   console.log(4)
})
console.log(5)

//控制台输出  1,2,5,4,3

------------------------------------------------------------
setTimeout(()=>{
   console.log(1)
},0)
var pro = new Promise((resolve,reject)=>{
    console.log(2)
    resolve(3)
    console.log(4)
    reject(5)
    console.log(6)
})
pro.then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})
console.log(7)

//控制台输出 2,4,6,7,3,1
```



### Promise的链式调用

```js
//异步函数
function delay(duration,callback){
    setTimeout(callback,duration)
}
//异步任务：等待1s输出1，然后在等待2s输出2，然后在等待3s输出3
delay(1000,()=>{
    console.log(1)
    delay(2000,()=>{
        console.log(2)
        delay(3000,()=>{
            console.log(3)
        })
    })
})

//用Promise改写上面函数
function delay(duration){
    return new Promise((resolve)=>{
        setTimeout(resolve,duration)
    })
}
delay(1000)     //返回一个promise
    		.then(()=>{         	//then(()=>{})空函数执行返回的也是promise,它的状态取决于{}里
        		console.log(1)		//面返回的promise状态,如，错误就是rejected
        		return delay(2000)   //执行完thenable后还返回promise，值就是返回值
       		})
			.then(()=>{
    			console.log(2)
    			return delay(3000)   //执行完thenable后还返回promise又可以.then()执行
			})
			.then(()=>{
    			console.log(3)
			})
```

### ES7 async await

```js
async function test(){
    await delay(1000)   //等待一个promise执行完成后再执行下面代码，是promise语法糖
    console.log(1)		
    await  delay(2000)   //await只能使用在异步函数（返回的是promise）里面async 标记的函数返回的是
    console.log(2)   	//promise
    await  delay(3000)
    console.log(3)
}
```

