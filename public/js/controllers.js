'use strict';

angular.module('myApp.controllers', [])

  .controller('MainCtrl', function ($scope) {


    $scope.list = [
      {
        id: 'a1',
        title: 'John Doe'
      },
      {
        id: 'a2',
        title: 'Pablo De Jesus'
      },
      {
        id: 'a3',
        title: 'Hong Gil Dong'
      }
    ];

    $scope.test = [];
    for (var i = 0; i < 10; i++) {
      var a = [];
      for (var j = 0; j < 10; j++) {
        a.push(i + ',' + j);
      }
      $scope.test.push(a);
    }

    // Drag and drop section
    $scope.dataid = 0;

    $scope.OnDragStart = function (evt) {

      $scope.dataid = evt.target.id;
      $scope.rx = evt.originalEvent.offsetX;
      $scope.ry = evt.originalEvent.offsetY;
      console.log(evt)

      // for firefox
      evt.dataTransfer.setData("text", evt.target.id);
    };

    $scope.OnDragOver = function (evt) {
      evt.preventDefault();
    };

    $scope.OnDrop = function (evt) {
      evt.preventDefault();
      var container = document.getElementById('container');

      var x = container.getBoundingClientRect().left;
      var y = container.getBoundingClientRect().top;
      var colIndex = ~~((evt.originalEvent.clientX - x) / 60) + 0;
      var rowIndex = ~~((evt.originalEvent.clientY - y) / 60) + 0;

      console.log(colIndex + ',' + rowIndex);
      var item = document.querySelectorAll('.cell')[colIndex + 10 * rowIndex];
      console.log('@' + item);
      console.log(item);
      var cell = document.createElement("td");
      var att = document.createAttribute("class");
      att.value = "cell occupied";
      cell.setAttributeNode(att);
      att = document.createAttribute("id");
      att.value = "" + (colIndex + 10 * rowIndex);
      cell.setAttributeNode(att);

      cell.appendChild(document.getElementById($scope.dataid));
      item.parentNode.replaceChild(cell, item);
      var q = container.getBoundingClientRect();
      console.log(evt.target)

      angular.element('#' + $scope.dataid).css('border', '1px solid red');
      // angular.element('#' + $scope.dataid).css('position', 'absolute');
      // var p = evt.target.getBoundingClientRect();
      // var last  = document.getElementById('container').lastChild;
      // console.log(last);

      //angular.element('#' + $scope.dataid).css('left', (evt.originalEvent.clientX - $scope.rx ) + 'px');
      //angular.element('#' + $scope.dataid).css('top', (evt.originalEvent.clientY - $scope.ry ) + 'px');
      angular.element('#' + $scope.dataid).css('width', '60px');
      angular.element('#' + $scope.dataid).css('height', '60px');

      // snap to grid


    };


  });
