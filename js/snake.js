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
            var firstCell = {x: 0, y: 0},
                direction = Snake.direction.RIGHT,
                nextCell = this.pg.getCell(firstCell);

            this.cells = [];
            while (length-- > 0) {
                this.cells.push(nextCell);
                nextCell.setState(PlaygroundModel.states.SNAKE);
                nextCell = nextCell[direction]();
            }
        },

        move: function () {
            var cells = this.cells,
                exTail = cells.shift(),
                oldHead = cells[cells.length - 1],
                newHead = oldHead[this.direction]();

            if (newHead.getState() !== PlaygroundModel.states.SNAKE) {
                cells.push(newHead);
                exTail.setState(PlaygroundModel.states.FREE);
                newHead.setState(PlaygroundModel.states.SNAKE);
            } else {
                throw new Error('You ate yourself.');
            }
        },

        turn: function (direction) {
            this.direction = direction;
        }
    };
})();