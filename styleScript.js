$(document).ready(function(){
    $('#updated').text('June 14th, 2015');
    $('.clickSort').click(function(){
        $('.clickSort').removeClass('activeSort');
        $(this).addClass('activeSort');
    });

    // $(".profile img").each(function () {
    //     //get height and width (unitless) and divide by 2
    //     var hWide = ($(this).width()) / 2; //half the image's width
    //     var hTall = ($(this).height()) / 2; //half the image's height, etc.

    //     // attach negative and pixel for CSS rule
    //     hWide = '-' + hWide + 'px';
    //     hTall = '-' + hTall + 'px';

    //     $(this).addClass("js-fix").css({
    //         "margin-left": hWide,
    //             "margin-top": hTall
    //     });
    // });
    
    
});