var app = angular.module('kkcounter', ['ngAnimate']);

app.controller('MainCtrl', ['$scope', '$filter', function ($scope, $filter) {
    $scope.text = [];

    $scope.search = function() {
    	console.log('you have clicked the search');
    };

    $scope.searching = function(evt) {
    	try {
	    	console.log( parseValue(evt.target) );
    	} catch(e) { console.log(e); }
    };

    var parseValue = function(target) {
		var value = target.value;
		var info = { 'calories': 0, 'weight': 0, 'date': $filter('date')(new Date(), "yyyyMMdd") };
		
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
			info.calories = Number($.trim(value.replace('c', '')))
			return updateCalories(info);
		}

		if(/[\d.]*[\d]+[ ]*[k]/i.test(value)) {
			info.weight = Number(value.replace('k', ''));
			return info;
		}

		if(/([\d]+[ ]*[g])[ ]*[\w]+/.test(value)) {
			var search = { foodName: '', quantity: 0, caloriesPer100: 0 };
			var quantityMatch = value.match(/[\d]+[ ]*[kg]/)[0];
			search.quantity = Number($.trim(quantityMatch.replace('g', '')));

			value = value.replace(quantityMatch, '');
			search.foodName = $.trim(value);

			console.log(search);
			return $.param(search)
		}
	};
}]);