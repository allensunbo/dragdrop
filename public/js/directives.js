'use strict';

angular.module('myApp.directives', [])

  .directive('jpDraggable', function () {
    return {
      scope: {
        myDragStart: '&jpDragstart',
        myDrop: '&jpDrop',
        myDragOver: '&jpDragover',
        myDragLeave: '&jpDragleave',
        myDragEnter: '&jpDragenter',
        myIsDraggable: '=jpIsdraggable'
      },
      link: function (scope, element, attrs) {
        if (scope.myIsDraggable == true) {
          //Add draggable attribute and set it to true
          if (!element.attr('draggable')) {
            element.attr('draggable', true);
          }
        }

        element.on('dragstart', function (evt) {
          scope.myDragStart({event: evt});
        });

        element.on('drop', function (evt) {
          scope.myDrop({event: evt});
        });

        element.on('dragover', function (evt) {
          scope.myDragOver({event: evt});
        });

        element.on('dragleave', function (evt) {
          scope.myDragLeave({event: evt});
        });

        element.on('dragenter', function (evt) {
          scope.myDragEnter({event: evt});
        });
      }
    };
  });





