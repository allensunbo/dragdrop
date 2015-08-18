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

    var lines = [], lines2 = [];
    for (var i = 1; i < $scope.colNum; i++) {
      lines.push({x1: 0, y1: i * $scope.cellHeight, x2: $scope.tableWidth, y2: i * $scope.cellHeight});
    }
    $scope.lines = lines;
    for (var i = 1; i < $scope.colNum; i++) {
      lines2.push({y1: 0, x1: i * $scope.cellWidth, y2: $scope.tableWidth, x2: i * $scope.cellWidth});
    }
    $scope.lines2 = lines2;

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

      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].id === $scope.dataid) {
          break;
        }
      }
      if (i < $scope.list.length) {
        var clone = angular.copy($scope.list[i], {});
        clone.id = clone.id + '-dropped';
        $scope.droppedItems.push(clone);
      }


      $scope.$apply(function () {
        $timeout(function () {
          for (var i = 0; i < $scope.droppedItems.length; i++) {
            console.log($scope.droppedItems[i])
            var elem = angular.element('#' + $scope.droppedItems[i]['id']);
            if (typeof elem.css('left') === 'undefined' || elem.css('left') === 'auto') {
              var sizeInfo = getSize(elem, evt, $scope);
              console.log(sizeInfo)
              var snapX = sizeInfo.col * $scope.cellWidth;
              elem.css('left', snapX + 'px');
              var snapY = sizeInfo.row * $scope.cellHeight;
              elem.css('top', snapY + 'px');
              console.log(snapX, snapY)
              elem.css('width', sizeInfo.sizeX * $scope.contentWidth + 'px');
              elem.css('height', sizeInfo.sizeY * $scope.contentHeight + 'px');
            } else if ($scope.dataid === $scope.droppedItems[i]['id']) {
              var sizeInfo = getSize(elem, evt, $scope);
              console.log(sizeInfo)
              var snapX = sizeInfo.col * $scope.cellWidth;
              elem.css('left', snapX + 'px');
              var snapY = sizeInfo.row * $scope.cellHeight;
              elem.css('top', snapY + 'px');
              console.log(snapX, snapY)
            }
          }
        });
      });
      return;
    };


  });

function getSize(elem, evt, $scope) {
  // snap to grid
  var col = 0, row = 0;
  col = ~~( (evt.originalEvent.offsetX - $scope.rx ) / $scope.cellWidth);
  // var snapX = whichCol * $scope.cellWidth;
  // angular.element('#' + $scope.dataid).css('left', snapX + 'px');
  row = ~~( (evt.originalEvent.offsetY - $scope.ry ) / $scope.cellHeight);
  // var snapY = whichRow * $scope.cellHeight;
  // angular.element('#' + $scope.dataid).css('top', snapY + 'px');

  // figure out how many grids needed
  var width = elem.css('width') ? elem.css('width').slice(0, -2) : ($scope.contentWidth); // -2: remove px suffix
  var height = elem.css('height') ? elem.css('height').slice(0, -2) : ($scope.contentHeight);// -2: remove px suffix
  var sizeX = ~~(width / $scope.contentWidth) + 1;
  var sizeY = ~~(height / $scope.contentHeight) + 1;
  /*angular.element('#' + $scope.dataid).css('width', actualWidth * $scope.contentWidth + 'px');
   angular.element('#' + $scope.dataid).css('height', actualHeight * $scope.contentHeight + 'px');*/
  return {
    sizeX: sizeX,
    sizeY: sizeY,
    col: col,
    row: row
  }
}
