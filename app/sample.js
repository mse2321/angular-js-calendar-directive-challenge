var demo  = angular.module('calendarDemoApp', []);

demo.controller('ctrl', function($scope){
	//$scope.month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
	$scope.month = [];
	$scope.now = new Date();
	$scope.currentYear = $scope.now.getFullYear();
	$scope.years = [];

	//console.log($scope.currentMonth);
	//console.log($scope.range);

	// sets year range
	var yearRangeStart = $scope.yearToday - 10;
	var yearRangeEnd = $scope.yearToday + 10;

	var CalendarRange = {

		  DAY : 24 * 60 * 60 * 1000,

		  prepareDate : function(date) {
		    date = new Date(date);
		    console.log('date - ' + date);

		    var day = date.getDay();
		    return {
		      date : date,
		      weekday : day != 0 && day != 6,
		      day : date.getDate(),
		      month : date.getMonth(),
		      year : date.getFullYear()
		    };
		  },
		  getMonthlyRange : function(date) {
		    var month = date.getMonth();
		    var startDay = new Date(date);
		    startDay.setDate(1);

		    console.log('startDay - ' +startDay);

		    var firstDay = new Date(startDay);
		    if (firstDay.getDay() > 0) { //Not Sunday
		      firstDay.setDate(firstDay.getDate() - (firstDay.getDay()));
		    }

		    var endDay = new Date(startDay);
		    if(month == 11) {
		      endDay.setMonth(0);
		      endDay.setYear(endDay.getFullYear() + 1);
		    } else {
		      endDay.setMonth(month + 1);
		    }


		    endDay.setDate(endDay.getDate() - 1);

		    var lastDay = new Date(endDay);
		    lastDay.setDate(lastDay.getDate() + (6 - endDay.getDay()));
		    console.log('lastDay - ' +lastDay);

		    var day = new Date(firstDay);
		    var days = [];
		    while(day <= lastDay) {
		      days.push(this.prepareDate(day));
		      day.setDate(day.getDate() + 1);
		    }
		    console.log('day - ' + day);
		    console.log('days - ' + days);

		    return {
		      first : firstDay,
		      start : startDay,
		      end : endDay,
		      last : lastDay,
		      days : days
		    };
  		}

	};

	// populates year options
	for(var i = yearRangeStart ; i < yearRangeEnd; i++) {
      $scope.years.push(i);
    }

	$scope.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthDayAmount = [31,29,31,30,31,30,31,31,30,31,30,31]; // number of days in each month
	// populates month options
	for(var i = 0 ; i < $scope.monthDayAmount.length; i++) {
      $scope.month.push($scope.monthDayAmount[i]);
      console.log($scope.month);
    }

    $scope.currentMonth = $scope.monthList[$scope.now.getMonth()];
    $scope.currentYear = $scope.years[$scope.yearToday];

    $scope.selectedDate = {
    	month: $scope.monthList,
    	year: $scope.years
    };

    $scope.$watchCollection('selectedDate', function(selectedDate){
    	$scope.newDate = selectedDate.month + ', ' + selectedDate.year;
		$scope.range = CalendarRange.getMonthlyRange(new Date($scope.newDate));
    	console.log($scope.newDate);
    	console.log($scope.range);
    });


	//$scope.currentYear = $scope.years[$scope.now.getFullYear()];
	
	//console.log($scope.currentYear);

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


// CalendarRange.js

/*
var CalendarRange = {

  DAY : 24 * 60 * 60 * 1000,

  prepareDate : function(date) {
    date = new Date(date);
    var day = date.getDay();
    return {
      date : date,
      weekday : day != 0 && day != 6,
      day : date.getDate(),
      month : date.getMonth(),
      year : date.getFullYear()
    };
  },

  getMonthlyRange : function(date) {
    var month = date.getMonth();
    var startDay = new Date(date);
    startDay.setDate(1);

    var firstDay = new Date(startDay);
    if (firstDay.getDay() > 0) { //Not Sunday
      firstDay.setDate(firstDay.getDate() - (firstDay.getDay()));
    }

    var endDay = new Date(startDay);
    if(month == 11) {
      endDay.setMonth(0);
      endDay.setYear(endDay.getFullYear() + 1);
    } else {
      endDay.setMonth(month + 1);
    }

    endDay.setDate(endDay.getDate() - 1);

    var lastDay = new Date(endDay);
    lastDay.setDate(lastDay.getDate() + (6 - endDay.getDay()));

    var day = new Date(firstDay);
    var days = [];
    while(day <= lastDay) {
      days.push(this.prepareDate(day));
      day.setDate(day.getDate() + 1);
    }

    return {
      first : firstDay,
      start : startDay,
      end : endDay,
      last : lastDay,
      days : days
    };
  }

};
*/