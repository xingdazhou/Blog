# CSS3练习

画叶子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>canvas</title>
</head>
<style>
    div{
        width:200px;
        height:100px;
        background:green;
        border-top-left-radius:139px 77px;
        border-bottom-right-radius:135px 75px;
    }
    line{
        stroke:#ccc;
    }
</style>
<body>
    <div>
        <svg width="200" height="100">
            <line x1="0" y1="100" x2="200" y2="0"></line>  
        </svg>
    </div>
</body>
</html>
```

![image-20200717113851680](../assets/image-20200717113851680.png)

画半圆

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>canvas</title>
</head>
<style>
    div{
        width:200px;
        height:100px;
        background:radial-gradient(circle at bottom,red,#ff0);
        border-radius:100px 100px 0 0 ; 
        /* 左上角（左，上），右上角，右下角，左下角 */
    }
</style>
<body>
    <div>
        
    </div>
</body>
</html>
```

![image-20200717115353188](../assets/image-20200717115353188.png)

## 阴影

box-shadow: x轴偏移量 y轴偏移量 阴影模糊半径（模糊程度） 阴影扩展半径（大小） 阴影颜色 投影方式（默认向外投影，向内就是inset）

页面中引入shadow会使页面性能降低



text-shadow:x轴偏移量 y轴偏移量 模糊程度 颜色



背景图片默认从padding引入，border区域会repeat的时候引入图片，no-repeat的时候border就没想从border开始引入图片可设置属性：**background-origin:border-box**

裁剪图片，默认图片从padding开始引入，可设置为content-box从内容区开始引入，后面会扩展到padding和border区域，可以用裁剪使得图片只在content区域 ： background-clip:content-box 默认情况不裁剪

颜色覆盖边框盒



webpack独有属性：backround-clip:text

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>canvas</title>
</head>
<style>
   p{
        width:600px;
        height:300px;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594971980943&di=25baca074d0cbf9ecc999b88327ab3ce&imgtype=0&src=http%3A%2F%2Fwww.lzsjedu.com%2Fupload%2F1551404801821579.png);
        text-fill-color:-webkit-background-clip;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        word-wrap: break-word;
        background-size: contain;
        font-size: 10px;
        line-height: 10px;
   }
</style>
<body>
    <p>无数个111...</p>
</body>
</html>
```

![image-20200717130538668](../assets/image-20200717130538668.png)

background-size:auto   默认auto 还有cover(图片铺满背景，比例过大就裁剪) contain(包含完整图片)