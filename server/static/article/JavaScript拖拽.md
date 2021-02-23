# js拖拽

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>js拖拽</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<style>
    .box {
        position: absolute;
        left: 100px;
        top: 100px;
        width: 100px;
        height: 100px;
        background: red;
        border-radius: 50%;
    }
</style>

<body>
    <div id="app">
        <div class="box" v-drag></div>
    </div>
    <script>
        let box = document.querySelector('.box')
        let x = 0
        let y = 0
        let f = false
        box.addEventListener('mousedown', function (e) {
            x = e.clientX - this.offsetLeft;
            y = e.clientY - this.offsetTop;
            f = true
        })
        document.addEventListener('mousemove', function (e) {
            if (f) {
                box.style.left = e.clientX - x + 'px'
                box.style.top = e.clientY - y + 'px'
            }

        })
        box.addEventListener('mouseup',function(e){
            f = false
        })
    </script>

</body>

</html>
```

