// app.directive("styleScripts", function() {
//   var linkFunction = function(scope, element, attributes) {
    
//     $('.profile').mouseenter(function(){
        
//         var riseHeight = $(this).find('.profileInfo').css('height') - 42;
//         //dont forget replace magic numbers later mac
        
//         $(this).find('.profileInfo').animate({
//             top:'284px',
//         },400);
        
//     }).mouseleave(function(){
//         $scope.$apply(function(){
//             $(this).find('.profileInfo').animate({
//                 top:'360px',
//             },400);
//         });
//     });

    
//   };

//   return {
//     restrict: "E",
//     link: linkFunction
//   };

// });