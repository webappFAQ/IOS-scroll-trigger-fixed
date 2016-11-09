
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