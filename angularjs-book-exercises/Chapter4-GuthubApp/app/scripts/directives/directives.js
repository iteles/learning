var directives = angular.module('guthub.directives', []);

//adds two watches to the rootScope, watching for a change in it. When that
//change starts ($routeChangeStart), it shows the loading text which is hidden
//by default. The second watch hides the text again when the route change is complete

//'loadingbar is the directive name, '$rootScope' is its only dependency and it has a
//function which returns the directive definition object

directives.directive('loadingbar', ['$rootScope', function($rootScope){
  return{
    link: function(scope, element, attrs){
      //the default state is to be hidden
      element.addClass('hide');

      //when a route change begins, un-hide the element and show it to the user
      //e.g. <div loadingbar>The app is loading...</div>
      $rootScope.$on('$routeChangeStart', function(){
        element.removeClass('hide');
      });

      //when the route change is complete, hide the loading text again
      $rootScope.$on('$routeChangeSuccess', function(){
        element.addClass('hide');
      });
    }
  };
}]);
//Note: if the directive's name was 'loadingBar' (camel case), you would use
//loading-bar as the attribute in your HTML code


//will be used as <input type="text" focus></input> in the HTML and will immediately
//have focus (as it will the the 'current' element or element[0]) when the page loads
directives.directive('focus', function(){
  return{
      link: function(scope, element, attrs){
          //takes the current element and applies focus to it
          element[0].focus();
      }
  };
});
