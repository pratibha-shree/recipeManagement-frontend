angular.module('RecipeManagement.controllers', []).


controller('recipeController', function($scope, recipeManagmentAPIservice, $rootScope) {
    $scope.selectedTab = 'Recipe';
    $scope.recipeList = [];
    $scope.selectedRecipe = {};
    $scope.showRecipe = false;
    $scope.newRecipe = {};
    $scope.showNewRecipe = false;
    $scope.newIngredient = {};
    $scope.ingredientList = {};
    $scope.showNewIngredient = false;
    $scope.errorMessage = [];
    $scope.isInvalid = false;
    $scope.isIngredientInvalid = false;
    $scope.message = "";
    $scope.editIngredient = false;
    $scope.selectedIngredient = {};



    $scope.selectTab = function(clickedTabValue) {
        $scope.selectedTab = clickedTabValue;
    }

    recipeManagmentAPIservice.getAllRecipe().success(function(response) {
        console.log('Response from backend');
        console.log(response);
        $scope.recipeList = response;
    });

    $scope.ShowRecipeDetails = function(selectedRecipeId) {
        $scope.errorMessage = [];
        $scope.isInvalid = false;
        $scope.showRecipe = true;
        $scope.showNewRecipe = false;
        for (var i = 0; i < $scope.recipeList.length; i++) {
            var recipe = $scope.recipeList[i];
            if (recipe.id == selectedRecipeId) {
                $scope.selectedRecipe = recipe;
                break;

            }
        }
    }

    $scope.showCreateRecipe = function() {
        $scope.showNewRecipe = true;
        $scope.showRecipe = false;
        $scope.selectedRecipe = {};
        $scope.errorMessage = [];
        $scope.isInvalid = false;


    }
    $scope.saveRecipe = function() {
        $scope.errorMessage = [];
        $scope.isInvalid = false;
        var name = $scope.newRecipe.name;
        var description = $scope.newRecipe.description;
        var imageUrl = $scope.newRecipe.imageUrl;
        if (name == null || name == "") {
            $scope.isInvalid = true;
            $scope.errorMessage.push("Name cannot be empty");
        }
        if (description == null || description == "") {
            $scope.isInvalid = true;
            $scope.errorMessage.push("Description cannot be empty");
        }
        if (imageUrl == null || imageUrl == "") {
            $scope.isInvalid = true;
            $scope.errorMessage.push("ImageUrl cannot be empty");
        }
        if ($scope.isInvalid == true) {
            return;
        }

        recipeManagmentAPIservice.createRecipe($scope.newRecipe).success(function(response) {
            console.log('Response from backend');
            console.log(response);
            recipeManagmentAPIservice.getAllRecipe().success(function(response) {
                console.log('Response from backend');
                console.log(response);
                $scope.recipeList = response;
            });
            $scope.newRecipe = {};
        });
    }

    $scope.cancelRecipe = function() {
        $scope.newRecipe = {};
        $scope.showNewRecipe = false;
        $scope.errorMessage = [];
        $scope.isInvalid = false;
    }
    $scope.deleteRecipe = function(selectedRecipeId) {
        recipeManagmentAPIservice.deleteRecipe(selectedRecipeId).success(function(response) {
            console.log('Response from backend');
            console.log(response);
            $scope.selectedRecipe = {};
            $scope.showRecipe = false;
            recipeManagmentAPIservice.getAllRecipe().success(function(response) {
                console.log('Response from backend');
                console.log(response);
                $scope.recipeList = response;
            });
        });

    }

    recipeManagmentAPIservice.getAllIngredient().success(function(response) {
        console.log('Response from backend');
        console.log(response);
        $scope.ingredientList = response;
    });

    $scope.showAddNewIngredient = function() {
        $scope.showNewIngredient = true;
    }

    $scope.saveIngredient = function() {
        $scope.isIngredientInvalid = false;

        if ($scope.newIngredient.name == null || $scope.newIngredient.name == "") {
            $scope.isIngredientInvalid = true;
            $scope.message = "Name cannot be empty";
        }
        if ($scope.isIngredientInvalid == true) {
            return;
        }

        recipeManagmentAPIservice.createIngredient($scope.newIngredient).success(function(response) {
            console.log('Response from backend');
            console.log(response);
            recipeManagmentAPIservice.getAllIngredient().success(function(response) {
                console.log('Response from backend');
                console.log(response);
                $scope.ingredientList = response;
            });
            $scope.newIngredient = {};
        });
    }
    $scope.cancelIngredient = function() {
        $scope.newIngredient = {};
        $scope.showNewIngredient = false;
    }
    $scope.showIngredientDetails = function(ingredientId) {
        $scope.editIngredient = true;
        for (var i = 0; i < $scope.ingredientList.length; i++) {
            var ingredient = $scope.ingredientList[i];
            if (ingredient.id == ingredientId) {
                $scope.selectedIngredient = ingredient;
                break;
            }

        }
    }
    $scope.updateIngredient = function() {
        recipeManagmentAPIservice.updateIngredient($scope.selectedIngredient).success(function(response) {
            console.log('Response from backend');
            console.log(response);
            recipeManagmentAPIservice.getAllIngredient().success(function(response) {
                console.log('Response from backend');
                console.log(response);
                $scope.ingredientList = response;
            });

        });
    }
    $scope.deleteIngredient = function(selectedIngredientId) {
        recipeManagmentAPIservice.deleteIngredient(selectedIngredientId).success(function(response) {
            console.log('Response from backend');
            console.log(response);
            $scope.selectedIngredient = {};
            $scope.editIngredient = false;
            recipeManagmentAPIservice.getAllIngredient().success(function(response) {
                console.log('Response from backend');
                console.log(response);
                $scope.ingredientList = response;
            });
        });

    }
    $scope.clearIngredient = function() {
        $scope.newIngredient = {};
        $scope.editIngredient = false;
    }

});