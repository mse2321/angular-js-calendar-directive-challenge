var demo  = angular.module('calendarDemoApp', []);

demo.controller('ctrl', function($scope){
	$scope.now = new Date();
	$scope.month = $scope.now.getMonth() + 1;
	$scope.selectedYear = $scope.now.getFullYear();
	$scope.day = $scope.now.getDate();
	$scope.years = [];

	var yearRangeStart = $scope.selectedYear - 10;
	var yearRangeEnd = $scope.selectedYear + 10;

	for(var i = yearRangeStart ; i < yearRangeEnd; i++) {
      $scope.years.push(i);
    }

	$scope.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.selectedMonth = $scope.monthList[$scope.now.getMonth()];

    $scope.chosenDate = {
    	month: $scope.selectedMonth,
    	year: $scope.selectedYear
    };

	$scope.currentMonthCheck = function(currentMonth){
		return (currentMonth == $scope.monthList.indexOf($scope.chosenDate.month));
	};

	$scope.$watchCollection('chosenDate', function(chosenDate){
		$scope.updatedDate = chosenDate.month + ', ' + chosenDate.year;
		$scope.range = CalendarRange.getMonthlyRange(new Date($scope.updatedDate));
		$scope.initialDay = $scope.range.first;
		$scope.firstDay = $scope.range.start;
		$scope.finalDay = $scope.range.last;
		$scope.lastDay = $scope.range.end;
		$scope.days = $scope.range.days;
	});

})

demo.directive('calendar', function() {
	return {
		templateUrl: 'calendar-template.html',
		restrict: 'E',
		scope: true,
		transclude: true
	}
})
demo.directive('calendarNav', function() {
	return {
		templateUrl: 'calendar-nav-template.html',
		restrict: 'E',
		scope: true,
		transclude: true
	}
});