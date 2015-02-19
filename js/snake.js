(function () {
    'use strict';

    Snake.direction = {
        TOP: 'top',
        LEFT: 'left',
        RIGHT: 'right',
        BOTTOM: 'bottom'
    }

    var snake = window.Snake = Snake;

    function Snake(playground, length) {
        this.pg = playground;
        this.direction = Snake.direction.RIGHT;
        this.init(length);
    }

    Snake.prototype = {

        init: function (length) {
            this.cells = [];
            for (var i = 0; i < length; i++) {
                this.cells.push({x: i, y: 0});
            }
        },

        move: function () {
            var prevTail = this.cells.shift(),
                oldHead = this.cells[this.cells.length - 1],
                newHead;

            switch (this.direction) {
                case 'left':
                    newHead = {x: oldHead.x - 1, y: oldHead.y};
                    break;
                case 'top':
                    newHead = {x: oldHead.x, y: oldHead.y - 1}
                    break;
                case 'right':
                    newHead = {x: oldHead.x + 1, y: oldHead.y}
                    break;
                case 'bottom':
                    newHead = {x: oldHead.x, y: oldHead.y + 1}
                    break;
            }

            this.cells.push(newHead)
            this.pg.setCell(prevTail, PlaygroundModel.states.FREE);
            this.pg.setCell(newHead, PlaygroundModel.states.SNAKE);
        },

        turn: function (direction) {
            this.direction = direction;
        }
    };
})();