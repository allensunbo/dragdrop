'use strict';

angular.module('myApp.controllers', [])

  .controller('MainCtrl', function ($scope, $timeout) {

    var SIZE = 96;

    $scope.colNum = 12;
    $scope.tableWidth = $scope.colNum * SIZE;
    $scope.tableHeight = $scope.colNum * SIZE;
    $scope.cellWidth = SIZE;
    $scope.cellHeight = SIZE;
    $scope.cellPadding = 2;
    $scope.contentWidth = $scope.cellWidth - 2 * $scope.cellPadding;
    $scope.contentHeight = $scope.cellHeight - 2 * $scope.cellPadding;
    $scope.showGridLines = true;

    $scope.droppedItems = [];

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

    gridLines($scope);

    // Drag and drop section
    $scope.dataid = 0;

    $scope.OnDragStart = function (evt) {
      var parentDraggable = evt.target.parentNode;
      while (parentDraggable) {
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

      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].id === $scope.dataid) {
          break;
        }
      }
      if (i < $scope.list.length) {
        var clone = angular.copy($scope.list[i], {});
        clone.id = clone.id + '-dropped' + new Date().getMilliseconds();
        $scope.droppedItems.push(clone);
      }

      $scope.$apply(function () {
        $timeout(function () {
          var layoutInfo;
          for (var i = 0; i < $scope.droppedItems.length; i++) {
            console.log($scope.droppedItems[i])
            var elem = angular.element('#' + $scope.droppedItems[i]['id']);
            if (typeof elem.css('left') === 'undefined' || elem.css('left') === 'auto') {
              layoutInfo = getLayoutInfo(elem, evt, $scope);
              var snapX = layoutInfo.col * $scope.cellWidth;
              elem.css('left', snapX + 'px');
              var snapY = layoutInfo.row * $scope.cellHeight;
              elem.css('top', snapY + 'px');
              elem.css('width', layoutInfo.sizeX * $scope.contentWidth + 'px');
              elem.css('height', layoutInfo.sizeY * $scope.contentHeight + 'px');
            } else if ($scope.dataid === $scope.droppedItems[i]['id']) {
              layoutInfo = getLayoutInfo(elem, evt, $scope);
              var snapX = layoutInfo.col * $scope.cellWidth;
              elem.css('left', snapX + 'px');
              var snapY = layoutInfo.row * $scope.cellHeight;
              elem.css('top', snapY + 'px');
            }
          }
        });
      });
    };


  });

function getLayoutInfo(elem, evt, $scope) {
  // snap to grid
  var col, row;
  var offSetX = 0, offSetY = 0;
  if ($scope.showGridLines) {
    if (evt.target.nodeName === 'svg' || evt.target.id === 'container') {
      console.log('in container')
    } else {
      console.log(evt);
      console.log('not in container');
      if (evt.target.hasAttribute('jp-draggable')) {
        var dropTarget = evt.target;
      } else {
        // TODO find nearest parent which has attribute 'jp-draggable'
        var dropTarget = evt.target.parentNode;
      }

      console.log(dropTarget);
      console.log(angular.element(dropTarget).css('left'));
      offSetX = parseInt(angular.element(dropTarget).css('left').slice(0, -2));
      offSetY = parseInt(angular.element(dropTarget).css('top').slice(0, -2));
    }
  } else {
    if (evt.target.id !== 'container') {
      console.log('not in container')
    } else {
      console.log('in container')
    }
  }

  console.log(evt.target.parentNode);

  col = ~~( (evt.originalEvent.offsetX - $scope.rx + offSetX) / $scope.cellWidth);
  row = ~~( (evt.originalEvent.offsetY - $scope.ry + offSetY) / $scope.cellHeight);

  console.log(evt.originalEvent.offsetX, $scope.rx, offSetX)
  console.log(evt.originalEvent.offsetY, $scope.ry, offSetY)
  console.log(col, row)

  // figure out how many grids needed
  var width = elem.css('width') ? elem.css('width').slice(0, -2) : ($scope.contentWidth); // -2: remove px suffix
  var height = elem.css('height') ? elem.css('height').slice(0, -2) : ($scope.contentHeight);// -2: remove px suffix
  var sizeX = ~~(width / $scope.contentWidth) + 1;
  var sizeY = ~~(height / $scope.contentHeight) + 1;

  return {
    sizeX: sizeX,
    sizeY: sizeY,
    col: col,
    row: row
  }
}

function gridLines($scope) {
  var lines = [], lines2 = [], i;
  for (i = 1; i < $scope.colNum; i++) {
    lines.push({x1: 0, y1: i * $scope.cellHeight, x2: $scope.tableWidth, y2: i * $scope.cellHeight});
  }
  $scope.lines = lines;
  for (i = 1; i < $scope.colNum; i++) {
    lines2.push({y1: 0, x1: i * $scope.cellWidth, y2: $scope.tableWidth, x2: i * $scope.cellWidth});
  }
  $scope.lines2 = lines2;
}
