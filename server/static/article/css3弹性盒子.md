# CSS3弹性盒子

### 多列布局   columns

语法：

columns：[column-width]  [column-count];

column-width：指每一列的宽度，根据容器宽度自适应

column-count：指规定的列数

### 盒模型

css中盒模型分为两种，一种是w3c标准盒模型，另一种是IE6混杂模式的传统盒模型

标准盒模型中，设置的width是内容区的宽度(content-box)

传统盒模型中，设置的width是width+padding+border的和宽度（border-box）

box-sizing属性



### flex

弹性盒子  display:flex;    flex为复合属性

属性设置在项目上（子元素）

- flex-grow：根据所设置的**比例**分配盒子所**剩余的空间**

- flex-shrink：超出宽度后压缩的比例，公式为：

  （某个项目的flex-shrink *  项目宽度）/  （每个项目的flex-shrink * 项目宽度width的总和）*   超出的宽度  = 该项目压缩宽度

  实际大小 = 宽度 - 压缩的宽度

- flex-basis：伸缩基准值

  该元素设置元素的 宽度，width也可以设置元素宽度，如果元素上同时出现width和flex-basis那么flex-basis会覆盖width的值

属性设置在容器上

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-item
- align-content

justify-content值为space-between，两端对齐边，两两项目之间间隔相等

justify-content值为space-around ，每个项目两侧间隔相等，项目之间的间隔会比项目与边框的间隔大一倍



### 移动端

模拟移动端meta

`	<meta name='viewport' content='width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no>`

minimum-scale=1.0  不能缩小

maximum-scale=1.0  不能放大

user-scalable=no   不能缩放



景深动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrapper{
            perspective:1200px;
            width:300px;
            height:300px;
        }
        .wrapper .box{
            transform-style: preserve-3d;
            width:200px;
            height:200px;
            position:absolute; 
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            animation: move 5s linear infinite;
        }
        .wrapper .box > div{
            position: absolute;
            width:200px;
            height:200px;
            font-size:50px;
            color:#fff;
            text-align: center;
            line-height: 200px;
            opacity: 0.6;
        }
       
        /* 前面 */
        .wrapper .box div:nth-of-type(1){   
            background:red;
            transform: translateZ(100px);
        }
        /* 上面 */
        .wrapper .box div:nth-of-type(2){
            background:blue;
            transform:rotateX(90deg) translateZ(100px);
            /* z轴也旋转向上 了 */
        }
        /* 后面 */
        .wrapper .box div:nth-of-type(3){
            transform:rotateX(180deg) translateZ(100px);
            background:gray;
        }
        /* 下面 */
        .wrapper .box div:nth-of-type(4){   
            background:green;
            transform:rotateX(-90deg) translateZ(100px);

        }
        /* 左面 */
        .wrapper .box div:nth-of-type(5){
            background:lightblue;
            transform:rotateY(90deg) translateZ(100px);
        }
        /* 右面 */
        .wrapper .box div:nth-of-type(6){
            background:yellow;
            transform:rotateY(-90deg) translateZ(100px);
        }
        @keyframes move {
            0%{
                transform:rotateX(0deg) rotateY(0deg)
            }
            100%{
                transform:rotateX(360deg) rotateY(360deg)
            }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="box">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </div>
</body>
</html>
```

效果：![image-20200726130345561](../assets/image-20200726130345561.png)

尽可能少用box-shadow与gradients,这两个都是页面性能杀手

尽量让动画脱离文档流，以减少重排

position:fixed;

position:absolute