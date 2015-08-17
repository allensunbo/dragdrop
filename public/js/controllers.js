'use strict';

angular.module('myApp.controllers', [])

  .controller('MainCtrl', function ($scope) {

    var SIZE = 96;

    $scope.colNum = 12;
    $scope.tableWidth = $scope.colNum * SIZE;
    $scope.cellWidth = SIZE;
    $scope.cellPadding = 2;
    $scope.contentWidth = $scope.cellWidth - 2 * $scope.cellPadding;

    $scope.list = [
      {
        id: 'a1',
        src: 'http://placehold.it/350x150'
      },
      {
        id: 'a2',
        src: 'http://placehold.it/250x150'
      },
      {
        id: 'a3',
        src: 'http://placehold.it/550x150'
      }
    ];

    $scope.test = [];
    for (var i = 0; i < $scope.colNum; i++) {
      var a = [];
      for (var j = 0; j < $scope.colNum; j++) {
        a.push(i + ',' + j);
      }
      $scope.test.push(a);
    }

    // Drag and drop section
    $scope.dataid = 0;

    $scope.OnDragStart = function (evt) {
      var parentDraggable = evt.target.parentNode;
      while (parentDraggable) {
        console.log(parentDraggable)
        if (parentDraggable.hasAttribute('jp-draggable')) {
          break;
        }
        parentDraggable = parentDraggable.parentNode;
      }
      $scope.dataid = parentDraggable.id;
      $scope.rx = evt.originalEvent.offsetX;
      $scope.ry = evt.originalEvent.offsetY;
      console.log('start with:' + $scope.dataid)

      // for firefox
      evt.dataTransfer.setData("text", $scope.dataid);
    };

    $scope.OnDragOver = function (evt) {
      evt.preventDefault();
    };

    $scope.OnDrop = function (evt) {
      evt.preventDefault();
      console.log(evt);

      var container = document.getElementById('container');

      var x = container.getBoundingClientRect().left;
      var y = container.getBoundingClientRect().top;
      console.log('x=' + x + ',y=' + y);
      var colIndex = ~~((evt.originalEvent.clientX - x) / SIZE) + 0;
      var rowIndex = ~~((evt.originalEvent.clientY - y) / SIZE) + 0;

      console.log(rowIndex + ',' + colIndex);
      var item = document.querySelectorAll('.cell')[colIndex + $scope.colNum * rowIndex];
      console.log('@' + item);
      console.log(item);
      var cell = document.createElement("td");
      var att = document.createAttribute("class");
      att.value = "cell occupied";
      cell.setAttributeNode(att);
      att = document.createAttribute("id");
      att.value = "" + (colIndex + $scope.colNum * rowIndex);
      cell.setAttributeNode(att);

      console.log($scope.dataid)
      console.log(document.getElementById($scope.dataid))
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
      angular.element('#' + $scope.dataid).css('width', $scope.contentWidth + 'px');
      angular.element('#' + $scope.dataid).css('height', $scope.contentWidth + 'px');

      // snap to grid


    };


  });
