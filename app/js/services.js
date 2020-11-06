angular.module('RecipeManagement.services', [])
    .factory('recipeManagmentAPIservice', function($http) {

        var backendAPI = {};

        backendAPI.getAllRecipe = function() {
            return $http.get('http://localhost:8080/recipe/list');
        }

        backendAPI.getRecipeById = function(id) {
            return $http.get('http://localhost:8080/recipe/' + id);
        }
        backendAPI.deleteRecipe = function(id) {
            return $http.delete('http://localhost:8080/recipe/' + id);
        }

        backendAPI.createRecipe = function(recipe) {
            return $http.post('http://localhost:8080/recipe', recipe);
        }

        backendAPI.getAllIngredient = function() {
            return $http.get('http://localhost:8080/ingredient/list');
        }
        backendAPI.createIngredient = function(ingredient) {
            return $http.post('http://localhost:8080/ingredient', ingredient);
        }

        backendAPI.deleteIngredient = function(id) {
            return $http.delete('http://localhost:8080/ingredient/' + id);
        }
        backendAPI.updateIngredient = function(ingredient) {
            return $http.put('http://localhost:8080/ingredient/' + ingredient.id, ingredient);
        }

        return backendAPI;
    });