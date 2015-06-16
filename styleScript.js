$(document).ready(function(){
    $('#updated').text('June 14th, 2015');
    $('.clickSort').click(function(){
        $('.clickSort').removeClass('activeSort');
        $(this).addClass('activeSort');
    });
});