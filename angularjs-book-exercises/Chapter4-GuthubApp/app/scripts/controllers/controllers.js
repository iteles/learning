var app = angular.module('guthub', ['guthub.directives', 'guthub.services']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'ListCtrl',
      resolve: {
        recipes: function(MultiRecipeLoader){
          return MultiRecipeLoader();
        }
      }, //end of resolve
      templateUrl: '/views/list.html'
    })
    .when('/edit/:recipeId', {
      controller: 'EditCtrl',
      resolve: {
        recipe: function(RecipeLoader){
          return RecipeLoader;
        }
      },
      templateUrl: '/views/recipeForm.html'
    })
    .when('/view/:recipeId', {
      controller: 'ViewCtrl',
      resolve: {
        recipe: function(RecipeLoader){
          return RecipeLoader;
        }
      },
      templateUrl: '/views/recipeForm.html'
    })
    //no resolve statement neede for new as you're creating a new recipe, not passing
    //in an existing one
    //ZZZ - where does /new get called?
    .when('/new',{
      controller: 'NewCtrl',
      templateUrl: '/views/recipeForm.html'
    })
    //always add in otherwise to redirect
    .otherwise({redirectTo:'/'});
}]);

//Note that this controller does none of the work of fetching data from the servers,
//it's handed a recipes list which has already been fetched by the services and is
//made available to the controller through app.config
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

//again, able to use $save function because recipe is and Angular resource
  $scope.save = function(){
    $scope.recipe.$save(function(){
      $location.path('/view/'+ recipe.id);
    });
  };
}]);

//This will be a child controller, used within other recipe controllers so will inherit $scope.recipe
//from parent controller
app.controller('IngredientsCtrl', ['$scope', function($scope){
  //creadint the addIngredients() method
  $scope.addIngredient = function(){
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  }; //ZZZ - Does the {} add the current scope ingredient somehow?

  $scope.removeIngredient = function(){
    //deletes 1 item from the array where the key is 'index' - rekeys the rest of the array
    $scope.recipe.ingredients.splice(index, 1);
  };
}]);
