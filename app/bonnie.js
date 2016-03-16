angular.module('calendarDemoApp', [])

.controller('displayToday', function($scope) {
  var today = new Date();
  var month = today.getMonth()+1;
  var day = today.getDate();
  var year = today.getFullYear();

  var yearsThirty = [];
  var yearsBefore = year - 20;
  var yearsAfter = year + 20;

  for(var i = yearsBefore; i <= yearsAfter; i++) {
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

  console.log($scope.monthsTwelve.indexOf($scope.selectedDate.month));

  $scope.isCurrentMonth = function(currentMonth){
    return (currentMonth == $scope.monthsTwelve.indexOf($scope.selectedDate.month));
  };

  $scope.$watchCollection('selectedDate', function(selectedDate){
    $scope.newDate = selectedDate.month + ', ' + selectedDate.year;
    $scope.range = CalendarRange.getMonthlyRange(new Date($scope.newDate));

    $scope.today = today;
    $scope.month = month;
    $scope.year = year;
    $scope.initialDay = $scope.range.first;
    $scope.firstDay = $scope.range.start;
    $scope.lastDay = $scope.range.end;
    $scope.finalDay = $scope.range.last;
    $scope.days = $scope.range.days;

    // $scope.initialRange = 
    if ($scope.initialDay < $scope.firstDay) {
      var dateDiff = Math.abs($scope.firstDay - $scope.initialDay);
      var initialRange = Math.ceil(dateDiff / (1000 * 3600 * 24)); 
      console.log(initialRange);
    }

    if($scope.finalDay > $scope.lastDay) {
      var dateDiff = Math.abs($scope.finalDay - $scope.lastDay);
      var finalRange = Math.ceil(dateDiff / (1000 * 3600 * 24)); 
      console.log(finalRange);
    }

  });
})

.directive('calendarDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'monthly-template.html',
    scope: true,
    transclude: true
  }
})
