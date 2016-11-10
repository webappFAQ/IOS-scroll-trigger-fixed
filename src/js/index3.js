(function(){
    $('#title-bar').scrollToFixed({
        preFixed: function() {
            $(this).find('.title').css('color', 'blue');
            $(document.body).removeClass('noScroll');
        },
        postFixed: function() {
            $(this).find('.title').css('color', '');
            $(document.body).addClass('noScroll');
        }
    });
})();