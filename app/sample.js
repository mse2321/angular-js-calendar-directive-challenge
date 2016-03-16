var demo  = angular.module('calendarDemoApp', []);

demo.controller('ctrl', function($scope){
	var today = new Date();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var day = today.getDate();

	var yearsThirty = [];
	var yearRangeStart = year - 10;
	var yearRangeEnd = year + 10;

	for(var i = yearRangeStart ; i <= yearRangeEnd; i++) {
      yearsThirty.push(i);
    }

    $scope.yearsThirty = yearsThirty;
  	$scope.selectYear = year;

	$scope.monthsTwelve = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.selectMonth = $scope.monthsTwelve[today.getMonth()];

	$scope.selectedDate = {
		month: $scope.selectMonth,
		year: $scope.selectYear
	};

	$scope.isCurrentMonth = function(currentMonth){
		return (currentMonth == $scope.monthsTwelve.indexOf($scope.selectedDate.month));
	};

	$scope.$watchCollection('selectedDate', function(selectedDate){
		$scope.newDate = selectedDate.month + ', ' + selectedDate.year;
		$scope.range = CalendarRange.getMonthlyRange(new Date($scope.newDate));
		console.log($scope.range);
		$scope.today = today;
		$scope.month = month;
		$scope.year = year;
		$scope.initialDay = $scope.range.first;
		$scope.firstDay = $scope.range.start;
		$scope.lastDay = $scope.range.end;
		$scope.finalDay = $scope.range.last;
		$scope.days = $scope.range.days;

		//set initialRange
		if ($scope.initialDay < $scope.firstDay){
			var dateDiff = Math.abs($scope.firstDay - $scope.initialDay);
			var initialRange = Math.ceil(dateDiff / (1000 * 3600 * 24));
			console.log(initialRange);
		}

		//set finalRange
		if ($scope.finalDay < $scope.lastDay){
			var dateDiff = Math.abs($scope.finalDay - $scope.lastDay);
			var finalRange = Math.ceil(dateDiff / (1000 * 3600 * 24));
			console.log(finalRange);
		}
	})



});
demo.directive('calendar', function() {
  return {
    restrict: 'AE',
    templateUrl: 'monthly-template.html',
    scope: true,
    transclude: true
  }
})