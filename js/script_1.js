$(window).on("load", function()
{
    if($(".hidenav_wrapper").length==0) var wrapper = $(window);
    else var wrapper = $(".hidenav_wrapper");
    
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    setnavabarheight();
    wrapper.scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    function hasScrolled() 
    {
        if(!$(".popupfoto_wrapper").hasClass("open") && !$(".popup_wrapper").hasClass("open") && !$('.hidenav').hasClass("fixed"))
        {
            var st = wrapper.scrollTop();

            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > navbarHeight){
                $('.hidenav').removeClass('nav-down').addClass('nav-up');
            } else {

                if($(".hidenav_wrapper").length==0) var doch = $(document).height();
                else var doch = wrapper[0].scrollHeight;
                
                var innerh =window.innerHeight;

                if(st + innerh < doch) {
                    if(st<=80)
                        $('.hidenav').addClass('top');
                    else 
                        $('.hidenav').removeClass('top');
                    $('.hidenav').removeClass('nav-up').addClass('nav-down');
                }
            }
            lastScrollTop = st;
        }
    }
    $(window).resize(function() 
    { 
       setnavabarheight()
    }); 
});
var navbarHeight;
function setnavabarheight()
{
    navbarHeight = $('.hidenav').outerHeight();
    $(".hidenav_gap").css("padding-top",(navbarHeight)+"px").addClass("ready");
}


