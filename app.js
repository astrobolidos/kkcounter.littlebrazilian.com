var app = angular.module('kkcounter', ['ngAnimate', 'ui.bootstrap']);

app.factory('calorieService', function($http) {
	return {
		updateCalories: function(info) {
			return $http.post('http://test/api/calories', info);
		}
	}
});

app.controller('MainCtrl', function ($scope, $filter, calorieService) {
    $scope.popOverMessage = [];
    $scope.icon = 'search';
    $scope.isSearching = false;

    $scope.search = function() {
    	console.log('you have clicked the search');
    };

    $scope.searching = function(evt) {
    	try {
    		updateUI($scope, parseValue(evt.target));
    	} catch(e) { console.log(e); }
    };

    var updateUI = function(scope, info) {
		if(info != undefined) {
			console.log(info);
			isUpdating = info.msg == 'updating...';
			$scope.isSearching = isUpdating ? true : false;
			$scope.icon = isUpdating ? 'cog' : 'search';
			$scope.popOverMessage = info.msg;   		
		}		
    };

    var parseValue = function(target) {
		var value = target.value;
		var info = { 
			'calories': 0, 
			'weight': 0, 
			'date': $filter('date')(new Date(), "yyyyMMdd"), 
			'msg' : '' };
		
		var dateMatch = value.match(/(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/);
		if(dateMatch && dateMatch.length > 0 && moment(dateMatch[0], 'DD/MM').isValid()) {
			info.date = moment(dateMatch[0] + '/' + moment().year(),'DD/MM/YYYY').format('YYYYMMDD');
			value = value.replace(dateMatch[0], ''); 
		} 

		if(/yesterday/.test(value)) {
			info.date = moment().subtract('days', 1).format('YYYYMMDD');
			value = value.replace('yesterday', '');
		}

		if(/[\d.]*[\d]+[ ]*[c]/i.test(value)) {
			info.msg = 'updating...';
			info.calories = Number(value.replace('c', ''));
			
			calorieService.updateCalories(info)
				.success(function() { 
					info.msg = 'updateCalorie success!'; 
				})
				.error(function(data, status, headers, config) { 
					info.msg = 'error on updateCalories:' + status + ' ' + data;
					updateUI($scope, info);
				});

			return info;
		}

		if(/[\d.]*[\d]+[ ]*[k]/i.test(value)) {
			info.weight = Number(value.replace('k', ''));
			return info;
		}

		if(/([\d]+[ ]*[g])[ ]*[\w]+/.test(value)) {
			var search = { foodName: '', quantity: 0, caloriesPer100: 0 };
			var quantityMatch = value.match(/[\d]+[ ]*[kg]/)[0];
			search.quantity = Number(quantityMatch.replace('g', ''));

			value = value.replace(quantityMatch, '');
			search.foodName = value;

			console.log(search);
			return search;
		}
	};
});