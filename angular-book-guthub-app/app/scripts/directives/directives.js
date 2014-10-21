var directives = angular.module('guthub.directives', []);

//adds two watches to the rootScope, watching for a change in it. When that
//change starts ($routeChangeStart), it shows the loading text which is hidden
//by default. The second watch hides the text again when the route change is complete
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
