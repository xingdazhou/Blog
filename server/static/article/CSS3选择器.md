# CSS3选择器

### 属性选择器

element[att^="val"]{...}  选择匹配的是元素element，并且元素定义了属性att，其属性值为以val开头的任何字符串

element[att$="val"]{...} 选择匹配的是元素element,并且元素定义了属性att,其属性值为以val结尾的任何字符串

element[att*="val"]{...} 选择匹配元素element，并且元素定义了属性att，其属性值是任意位置出现了‘val’的字符串，即其属性值包含了val，位置任意。



### 伪类选择器

伪类用于向某些选择器添加特殊的效果

1. root根标签选择器

   :root选择器等同于html标签选择器

   即：:root{color:red} 和 html{color:red}  效果是形同的

1. :not 否定选择器

   div:not([class="demo"]){

    color:red

   }

   意思是除了div中class为demo的div外，所有的div背景颜色都为红色

伪类的效果是可以通过添加一个实际的类来达到

伪元素的效果则是需要通过添加一个实际的元素才能达到

li:nth-child(n)  n从1开始，表示取的li当中的第一个 

li:first-child{...} 选中所以li子元素中第一个，若第一个不为li则不能选中

li:first-of-type{...} 选中所有li中子元素中第一个li，只关心所有li中的第一个li

### 伪元素选择器

::selection 用来匹配突出显示的文本，（用鼠标选中文本的时候浏览器默认是蓝底白字）

属性：user-select:none 之后就不能用鼠标选中文本了



div + span  表示选中div下面紧挨着的那个span元素

div ~ span 表示选中div后面所有的span元素



### transition过渡

速写属性：

transition:all 1s linear 1s

等价于：

transition-property:all

transition-duration:1s;

transition-timing-function:linear;

transition-delay:1s;



### animation

@keyframes 动画帧

