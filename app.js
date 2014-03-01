var app = angular.module('kkcounter', ['ngAnimate']);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.text = [];

    $scope.search = function() {
    	console.log('you have clicked the search');
    };

    $scope.searching = function(evt) {
    	console.log( evt );
    };
}]);