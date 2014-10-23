var services = angular.module('guthub.services', ['ngResource']);

//returns our Recipe as an Angular Resource - a RESTful resource which point at
//a RESTful server - which also encapsulates the lower level $http service so
//you don't have to make explicit calls to it
services.factory('Recipe', ['$resource',
  function($resource){
    //returning a $resource here provides the Recipe object with .get(), .save(),
    //.remove() & .delete() methods which return a single Recipe as well as
    //.query() which returns an array of recipes

    //USAGE: when creating a new recipe, your controller states $scope.recipe = new Recipe
    //which allows it to then be creating a *resource* with all associated and useful methods

    //'recipes/:id' means you can call any of the above methods on a Recipe object
    //and if you pass it an id, e.g. Recipe.get({id:1}), it will make a call to recipes/1
    //{id: '@id'} tells the method you call to pick the id from the URL and use it as the
    //id parameter when carrying out the action, for example, saving a recipe
    return $resource('/recipes/:id', {id: '@id'});

  }]);


services.factory('MultiRecipeLoader', ['Recipe', '$q', function(Recipe, $q){
  return function(){
    var delay = $q.defer();

    Recipe.query(function(recipes){
      delay.resolve(recipes);
      }, function(){
          delay.reject('Unable to fetch recipes');
    });

    return delay.promise;
  };
}]);

services.factory('RecipeLoader', ['Recipe', '$route', '$q', function(Recipe, $route, $q){
  return function(){
    var delay = $q.defer();

    Recipe.get({id:$route.current.params.id,}, function(recipe) {
      delay.resolve(recipe);
    }, function(){
        delay.reject('Unable to fetch recipe with id: ' + $route.current.params.id);
    });
    return delay.promise;
  };
}]);
