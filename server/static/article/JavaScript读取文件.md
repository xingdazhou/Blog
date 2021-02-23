# JavaScript读取文件

FileReader类型实现的是一种异步文件读取机制，可以把FileReader想象成XMLHttpRequest,区别就是它读取的是文件系统，而不是远程服务器。

红宝书689页相关知识点练习，只使用了部分方法

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="file">
    <script>
        let filesList = document.querySelector('input')
        filesList.addEventListener('change',function(e){
            console.log(e)
            let type = ''
            let reader = new FileReader();
            reader.onload = function(){
                console.log(reader.result)
                if(type == 'image'){
                    let img = document.createElement('img')
                    img.src = reader.result
                    document.body.appendChild(img)
                    // document.getElementsByTagName('div').innerHTML = '<img>'
                }else{
                    let p = document.createElement('p')
                    p.innerText = reader.result
                    document.body.appendChild(p)
                }
            }
            console.log(e.target.files[0].type)
            if(e.target.files[0].type.indexOf('image')!=-1){
                reader.readAsDataURL(e.target.files[0])
                type = 'image'
            }else{
                type = 'txt'
                reader.readAsText(e.target.files[0],'utf-8')
            }
        },false)
    </script>
</body>
</html>
```

![image-20200925074708586](../assets/image-20200925074708586.png)

![image-20200925074752140](../assets/image-20200925074752140.png)

