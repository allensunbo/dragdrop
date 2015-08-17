'use strict';

var maxPoints = 120;

angular.module('myApp.services', [])
  .value('version', '0.1')
  .service('ChartDataService', function () {

    // all dates are in yyyy-MM-dd format

    // allTradingDays: an array that holds all trading days
    // eg ['2009-05-01', '2009-05-04', ...]
    this.allTradingDays = allTradingDays();

    // rawDates: an object that holds information such as available days & roll forward for each attribute
    // eg {
    //      'AWESOME_PORTFOLIO': {
    //        'available_dates': ['2009-05-01', '2009-05-04', ...],
    //        'number_of_roll_forwarded': 2,
    //        'display_name': 'awesome portfolio',
    //        'raw_name': 'my.awesome portfolio',
    //      },
    //      'AWESOME_PORTFOLIO_2': {
    //        'available_dates': ['2009-05-01', '2009-05-04', ...],
    //        'number_of_roll_forwarded': 2,
    //        'display_name': 'awesome portfolio (your)',
    //        'raw_name': 'your.awesome portfolio'
    //      },
    //      'BAD_BENCHMARK': {
    //        'available_dates': ['2009-05-01', '2009-05-04', ...],
    //        'number_of_roll_forwarded': 2,
    //        'display_name': 'Bad Benchmark',
    //        'raw_name': 'shared.bad benchmark'
    //      }, ...
    //    }
    // IMPORTANT!!! all object keys (usually capitalized) and raw/display names must (and they should!) be unique!
    // TODO also consider available_dates in the format of an array of integers
    // where the integer is the index of a date in allTradingDays
    this.rawDates = rawDates;

    this.randomDates = randomDates;
  });

function getCleanDateString(date) {
  return date.toISOString().slice(0, 10);
}

function isWeekend(dayString) {
  var date = new Date(dayString);
  return date.getDay() >= 5;
}

function allTradingDays() {
  var allTradingDays = [];
  var startDate = new Date('2009-05-01');
  var i = 0, n = 0;
  while (n < maxPoints) {
    var d = new Date('2009-05-01');
    d.setDate(startDate.getDate() + i);
    if (!isWeekend(getCleanDateString(d))) {
      allTradingDays.push(getCleanDateString(d));
      n++;
    }
    i++;
  }
  return allTradingDays;
}

function rawDates(allTradingDays) {
  var special = randomDates(allTradingDays);
  if (special.indexOf(allTradingDays.slice(-1)[0]) < 0)
    special.push(allTradingDays.slice(-1)[0]);
  return {
    // available is case sensitive
    'AWESOME_PORTFOLIO': {
      'available_dates': randomDates(allTradingDays),
      'number_of_roll_forwarded': 2,
      'display_name': 'awesome portfolio',
      'raw_name': 'my.awesome portfolio'
    },
    'AWESOME_PORTFOLIO_2': {
      'available_dates': randomDates(allTradingDays),
      'number_of_roll_forwarded': 2,
      'display_name': 'awesome portfolio (your)',
      'raw_name': 'your.awesome portfolio'
    },
    'BAD_BENCHMARK': {
      'available_dates': special,
      'number_of_roll_forwarded': 2,
      'display_name': 'Bad Benchmark',
      'raw_name': 'shared.bad benchmark'
    },
    'RISK_MODEL': {
      'available_dates': randomDates(allTradingDays),
      'number_of_roll_forwarded': 20,
      'display_name': 'Risk Model'
    },
    'SHARED_CLASSIFICATION': {
      'available_dates': randomDates(allTradingDays),
      'number_of_roll_forwarded': 5,
      'display_name': 'Classification (shared)',
      'raw_name': 'shared.Classification'
    },
    'PRICE': {
      'available_dates': allTradingDays,
      'number_of_roll_forwarded': 5,
      'display_name': 'Price',
      'raw_name': 'Price'
    },
    'PRICE_2': {
      'available_dates': [],
      'number_of_roll_forwarded': 7,
      'display_name': 'Price-2 (my)',
      'raw_name': 'my.Price-2'
    }
  }
}
function randomDates(allTradingDays) {
  var dates = [], i = 0, n = 0, s = 0;
  while (i < maxPoints) {
    n = ~~(Math.random() * 10);
    s = ~~(Math.random() * n / 2) + (  n / 2);
    for (var k = i; k < i + s; k++) {
      dates.push(allTradingDays[k]);
    }
    i = i + n;
    if (i + n >= maxPoints) {
      return dates;
    }
  }
}
