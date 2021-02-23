# canvas画布

canvas的应用场景

1. 游戏
1. 图标（echart以canvas为基础）
1. 动画
1. codepen.io(里面有很多canvas动画效果)

canvas发展历史

1. ie9之前的浏览器都不支持canvas
1. http://caniuse.com/
1. www.css88.com (各种中文文档)

canvas初始化画布，添加canvas标签

```html
<canvas id="canvas" width="500" height="500"></canvas>
```



获取canvas元素

```js
var canvas = document.getElementById('canvas')
```



获得canvas上下文对象

```js
var ctx = canvas.getContext('2d')  //绘制3d就传参为 ’webgl‘
```



画一个矩形

```js

let canvas = document.getElementById('canvas')    //canvas相当于画布
let ctx = canvas.getContext('2d')     //ctx相当于画笔
ctx.moveTo(100,100)
ctx.lineTo(200,100)
ctx.lineTo(200,200)
ctx.lineTo(100,200)
ctx.lineTo(100,100)
ctx.strokeStyle = 'red'
ctx.lineWidth=20
ctx.stroke()
```

![image-20200716102647785](../assets/image-20200716102647785.png)

填充矩形

```js
let canvas = document.getElementById('canvas')    //canvas相当于画布
let ctx = canvas.getContext('2d')     //ctx相当于画笔
ctx.moveTo(100,100)
ctx.lineTo(200,100)
ctx.lineTo(200,200)
ctx.lineTo(100,200)
ctx.lineTo(100,100)
ctx.strokeStyle = 'red'
ctx.lineWidth=20
ctx.fillStyle = 'blue'
ctx.stroke()
ctx.fill()
```



![image-20200716102746155](../assets/image-20200716102746155.png)

画三角形，闭合路径

```js
        let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        ctx.moveTo(100,100)
        ctx.lineTo(200,100)
        ctx.lineTo(200,200)
        // ctx.lineTo(100,200)
        // ctx.lineTo(100,100)
        ctx.strokeStyle = 'red'
        ctx.lineWidth=20
        ctx.fillStyle = 'blue'
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
```

![image-20200716103108265](../assets/image-20200716103108265.png)

ctx.beginPath()重新开始一条路径，不会对后面路径有影响（颜色覆盖等影响）

**画矩形函数**

1. ctx.rect(x,y,dx,dy)    x,y起始点，dx,dy是宽，高

   ```js
   let canvas = document.getElementById('canvas')    //canvas相当于画布
           let ctx = canvas.getContext('2d')     //ctx相当于画笔
           ctx.rect(100,100,100,100)  
           ctx.stroke();
   ```

   ![image-20200716103703488](../assets/image-20200716103703488.png)

1. ctx.fillRect(x,y,dx,dy)

   ```js
   let canvas = document.getElementById('canvas')    //canvas相当于画布
           let ctx = canvas.getContext('2d')     //ctx相当于画笔
           //ctx.rect(100,100,100,100)  
           //ctx.fill();
           ctx.fillRect(100,100,100,100)   //把画矩形和填充合并
   ```

   ![image-20200716104046283](../assets/image-20200716104046283.png)

1. ctx.strokeRect(x,y,w,h)

   ```js
   let canvas = document.getElementById('canvas')    //canvas相当于画布
           let ctx = canvas.getContext('2d')     //ctx相当于画笔
           //ctx.rect(100,100,100,100)  
           //ctx.stroke();
           ctx.strokeRect(100,100,100,100)   //把画矩形和描边合并
   ```

   

ctx.clearRect(x,y,dx,dy)   擦除一个矩形区域

 画一个不断下落的矩形

```js
let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        let y = 100
        ctx.fillRect(100,y,50,50)   //把画矩形和填充合并
        var timer = setInterval(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.fillRect(100,y,50,50)
            y += 10
            if(y>450){
                clearInterval(timer)
            }
        },16)
```



### 弧形

1. ctx.arc(x,y,起始弧度，结束弧度，弧度的方向)
1. 0顺时针 1逆时针

```js
		let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        ctx.arc(200,200,100,Math.PI/180 * 0,Math.PI/180 * 90,0)  //0-90度的弧线
        ctx.stroke()
```

![image-20200716111137151](../assets/image-20200716111137151.png)

画一个扇形

```js
	    let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        ctx.moveTo(200,200)
        ctx.lineTo(300,200)
        ctx.arc(200,200,100,Math.PI/180 * 0,Math.PI/180 * -45,1)  //0-90度的弧线
        ctx.closePath()
        ctx.stroke()
```



![image-20200716111534408](../assets/image-20200716111534408.png)

画一个缺口

```js
let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        ctx.moveTo(200,200)
        ctx.lineTo(300,200)
        ctx.arc(200,200,100,Math.PI/180 * 0,Math.PI/180 * -45,0)  //0-90度的弧线
        ctx.closePath()
        ctx.stroke()
```

![image-20200716111708664](../assets/image-20200716111708664.png)

贝塞尔曲线

1. quadraticCurveTo(x1,x2,ex,ey)  二次贝塞尔曲线   x1,x2控制点，ex，ey结束点

   ```js
   let canvas = document.getElementById('canvas')    //canvas相当于画布
           let ctx = canvas.getContext('2d')     //ctx相当于画笔
           ctx.moveTo(100,200)
           ctx.quadraticCurveTo(200,100,300,400)
           ctx.stroke()
   ```

   

   ![image-20200716114320728](../assets/image-20200716114320728.png)

1. bezierCurveTo(x1,y1,x2,y2,ex,ey)  三次贝塞尔曲线 x1,y1,x2,y2,控制点，ex,ey结束点

   ```js
   		let canvas = document.getElementById('canvas')    //canvas相当于画布
           let ctx = canvas.getContext('2d')     //ctx相当于画笔
           ctx.moveTo(100,200)
           ctx.bezierCurveTo(200,100,300,400,500,200)
           ctx.stroke()
   ```

   

![image-20200716114446481](../assets/image-20200716114446481.png)

渐变

`ctx.createLinearGradient(x1,y1,x2,y2)`

```js
let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        var bg = ctx.createLinearGradient(0,0,0,500)  //起始点和终点
        bg.addColorStop(0,"#000")
        bg.addColorStop(0.5,"red")
        bg.addColorStop(1,"#fff")
        ctx.fillStyle = bg
        ctx.fillRect(0,0,500,500)
```

![image-20200716115511389](../assets/image-20200716115511389.png)

`createRadialGradient(x1,y1,r1,	x2,y2)`  径向渐变

```js
		let canvas = document.getElementById('canvas')    //canvas相当于画布
        let ctx = canvas.getContext('2d')     //ctx相当于画笔
        var bg = ctx.createRadialGradient(250,250,100,270,270,150)  //小圆和大圆的参数
        bg.addColorStop(0,"#000")
        bg.addColorStop(0.5,"red")
        bg.addColorStop(1,"#fff")
        ctx.fillStyle = bg
        ctx.fillRect(0,0,500,500)
```

![image-20200716120357045](../assets/image-20200716120357045.png)