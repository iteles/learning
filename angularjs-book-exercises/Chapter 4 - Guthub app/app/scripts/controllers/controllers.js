var app = angular.module('guthub.controllers', []);

//Note that this controller does none of the work of fetching data from the servers,
//it's handed a recipes list which has already been fetched by the services
app.controller('ListCtrl', ['$scope', 'recipes', function($scope, recipes){
  $scope.recipes = recipes;
}]);

app.controller('ViewCtrl', ['$scope', '$location', 'recipe', function($scope, $location, recipe){
  $scope.recipe = recipe;

  //this creates an edit() method which can be called on an HTML form (for example)
  //like so: <form ng-submit="edit()"> - it takes the current recipe ID and changes
  //the view path to the equivalent edit view using the recipe ID in the path.
  //Angular then knows to automatically update to the right template because of the
  //routing configurations
  $scope.edit = function(){
    $location.path('/edit/' + recipe.id);
  };
}]);

app.controller('EditCtrl', ['$scope', '$location', 'recipe', function($scope, $location, recipe){
  $scope.recipe = recipe;

  $scope.save = function(){
    //using the $save method here is only possible because the recipe is an Angular $resource
    //object (it was returned by the RecipeLoader service)
    $scope.recipe.$save(function(recipe){
      //once the controller has saved the recipe, it redirects the user to the view screen for
      //that same recipe (it will now show the newly saved details of course)
      $location.path('/view/'+ recipe.id);
    });
  };

  //this function currently ONLY REMOVES THE RECIPE FROM SCOPE, not from the 'server'
  //once recipe is removed from scope, redirects user to homepage
  $scope.remove = function(){
    delete $scope.recipe;
    $location.path('/');
  };
}]);

app.controller('NewCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe){

  //creates a new Angular $resource, Recipe
  $scope.recipe = new Recipe({
    ingredients: [ { }]
  });

  $scope.save = function(){
    $scope.recipe.$save(function(){
      $location.path('/view/'+ recipe.id);
    });
  };
}]);
