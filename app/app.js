var demo  = angular.module('calendarDemoApp', []);

demo.controller('ctrl', function($scope){
	//$scope.month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
	$scope.month = [];
	$scope.now = new Date();
	$scope.currentYear = $scope.now.getFullYear();
	$scope.years = [];

	var yearRangeStart = $scope.currentYear - 10;
	var yearRangeEnd = $scope.currentYear + 10;

	for(var i = yearRangeStart ; i < yearRangeEnd; i++) {
      $scope.years.push(i);
    }

	$scope.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthDayAmount = [31,29,31,30,31,30,31,31,30,31,30,31];
	for(var i = 0 ; i < $scope.monthDayAmount.length; i++) {
      $scope.month.push($scope.monthDayAmount[i]);
      console.log($scope.month);
    }

	$scope.currentMonth = $scope.monthList[$scope.now.getMonth()];

})
// your controller and directive code go here
demo.directive('calendar', function() {
	return {
		template: '<div class="day_wrap" ng-repeat="day in month track by $index">{{ day }}</div>'
	}
})
demo.directive('calendarNav', function() {
	return {
		template: '<select ng-model="currentMonth" ng-options="item as item for item in monthList"></select><select ng-model="currentYear" ng-options="year as year for year in years"></select>'
	}
});