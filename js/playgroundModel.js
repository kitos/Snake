(function ($) {
    'use strict';

    PlaygroundModel.states = {
        FREE: 'free',
        SNAKE: 'snake',
        FROG: 'frog'
    };

    window.PlaygroundModel = PlaygroundModel;

    function PlaygroundModel(height, width) {
        this.listeners = [];

        this.height = function () {
            return height;
        };

        this.width = function () {
            return width;
        };

        this.init();
    }

    function Cell(playground, x, y, state) {
        this.pg = playground;
        this.x = x;
        this.y = y;

        this.getState = function () {
            return state;
        };

        this.setState = function (newState) {
            state = newState;
            this.pg.fireCellChanged(this);
            return this;
        }
    }

    Cell.prototype = {
        left: function () {
            return this.pg.cells[_normalise(this.x - 1, this.pg.width())][this.y];
        },
        right: function () {
            return this.pg.cells[_normalise(this.x + 1, this.pg.width())][this.y];
        },
        top: function () {
            return this.pg.cells[this.x][_normalise(this.y - 1, this.pg.height())];
        },
        bottom: function () {
            return this.pg.cells[this.x][_normalise(this.y + 1, this.pg.height())];
        }
    };

    function _normalise(coord, max) {
        return (coord < 0) ? (max - 1) : ((coord >= max ) ? 0 : coord);
    }

    PlaygroundModel.prototype = {

        init: function () {
            var cells = this.cells = new Array(this.w),
                pgModel = this;

            for (var x = 0; x < this.width(); x++) {
                cells[x] = new Array(this.height());
                for (var y = 0; y < this.height(); y++) {
                    cells[x][y] = new Cell(this, x, y, PlaygroundModel.states.FREE);
                }
            }
        },

        fireCellChanged: function (cell) {
            this.notifyListeners(cell);
        },

        getCell: function (coord) {
            return this.cells[coord.x][coord.y];
        },

        addListener: function (listener) {
            this.listeners.push(listener);
        },

        notifyListeners: function (cell) {
            this.listeners.forEach(function (listener) {
                listener(cell);
            });
        }
    }

})(jQuery);