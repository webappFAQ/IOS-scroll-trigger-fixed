---
title: IOS-scroll-trigger-fixed (第一篇)
date: 2016-11-09 11:40:00
categories: 技术
tags: BUG
---

# 背景

在很多业务中大家都会用到scroll， 列表滚动的功能， 但是在苹果手机Safari浏览器上，我们会发现有以下问题：

- 在页面上我们要把一个本身不是悬浮的头部组件在滚动越过头部的时候变成悬浮的状态，那么结果往往会这样:
	
<video id="video" controls="" preload="none" poster="http://o758oxs40.bkt.clouddn.com/blog/imgf67ac3879f66c98ba6eaab784a1f3359.jpg">
      <source id="mp4" src="http://o758oxs40.bkt.clouddn.com/blog/mediaf67ac3879f66c98ba6eaab784a1f3359.mp4" type="video/mp4">
</video>

> 代码片段：
> index.html

>  ``` html
	 <body>
	     <div class="app-wrap">
	         <div class="color-block">广告栏</div>
	         <div class="title" style="position: relative;top:auto">My Scroll 1</div>
	        <div class="list-wrap">
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	            <div class="list-item"></div>
	        </div>
	    </div>
	</body>
  ```
> index.js

> ``` javascript
	(function(){
	    var currentTop = $('.title').offset().top;
	    function onScroll(){
	        console.log(12345511);
	        var top = document.body.scrollTop || document.documentElement.scrollTop;
	        if(top >= (currentTop)) {
	            $('.title').attr('style','position: fixed;top:0');
	        } else {
	            $('.title').attr('style','position: relative;top:auto');
	        }
	    }
	    window.addEventListener('scroll', onScroll);
	})()

 ```






经过上面的演示可以看到，在safari浏览器上 滚动过后需要手指离开屏幕的时候才能显示悬浮的头部组件，那么究竟是为什么会这样子呢？


# 分析

ios的*webview 内核* 设定了其在进行*momentum scrolling(弹性滚动)*时,会停止所有的 事件响应 及 DOM操作引起的页面渲染 (亲测),故 onscroll 不能实时响应


# 兼容方案

- 改变页面布局，在滚动达到头部要悬浮的条件后改变父元素的样式，通过*css权重*来改变头部组件的样式，使之变成*position:fixed*


> 代码片段：
> index.html
> ``` html
	<body class="noScroll">
	<div id="wrap" class="app-wrap">
	    <div class="color-block">广告栏2</div>
	    <div class="title-wrap">
	        <div class="title">My Scroll 2</div>
	    </div>
	    <div class="list-wrap">
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	        <div class="list-item"></div>
	    </div>
	</div>
	</body>
```

> index.js
>  ``` javascript
(function(){
    var parent = $(document.body);
    var currentTop = $('.title').offset().top;
    function onScroll(){
        //console.log(12345511);
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        if(top >= (currentTop)) {
            parent.removeClass('noScroll');
            //$('.title').attr('style','position: fixed;top:0');
        } else {
            parent.addClass('noScroll');
            //$('.title').attr('style','position: relative;top:auto');
        }
    }
    window.addEventListener('scroll', onScroll);
})()
 ```

> index.css
>  ``` css
.app-wrap .title ,.app-wrap .title-wrap{
    width: 100%;
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #999;
    position: fixed;
    top:0px;
}

.app-wrap .title,html .noScroll .title{
    z-index: 5;
}

.app-wrap .title-wrap,html .noScroll .title-wrap{
    z-index: 1;
}

html .noScroll .title-wrap,html .noScroll .title{
    position: relative;
    top:auto;
}

 ```

# 结果


<video id="video" controls="" preload="none" poster="http://o758oxs40.bkt.clouddn.com/blog/img332d0b27aad7253f0a026638f0a80ec5.jpg">
      <source id="mp4" src="http://o758oxs40.bkt.clouddn.com/blog/media332d0b27aad7253f0a026638f0a80ec5.mp4" type="video/mp4">
</video>


# 然而
- 经过我们在IOS其他浏览器上，此方案还位完全解决;不兼容的浏览器分别是UC浏览器，IOS微信等, 不过目前已经有新的解决方案，欲知后事如何，请听下回分解，谢谢！  麻烦打赏一下  ^_^










