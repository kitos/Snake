(function ($) {
    'use strict';

    PlaygroundModel.states = {
        FREE: 'free',
        SNAKE: 'snake',
        FROG: 'frog'
    };

    var pg = window.PlaygroundModel = PlaygroundModel;

    function PlaygroundModel(height, width) {
        this.h = height;
        this.w = width;
        this.listeners = [];

        this.init();
    }

    PlaygroundModel.prototype = {

        height: function () {
            return this.h;
        },

        width: function () {
            return this.w;
        },

        init: function () {
            this.cells = new Array(this.w);
            for (var y = 0; y < this.w; y++) {
                this.cells[y] = new Array(this.h);
            }
        },

        setCell: function (cell, state) {
            if (cell.x < 0 || cell.y < 0 || cell.x >= this.w || cell.y >= this.h) {
                throw new Error("Index out of bound exception (playground size: ${height}x${width}, cell: ${cell})."
                        .replace('${height}', this.h)
                        .replace('${width}', this.w)
                        .replace('${cell}', JSON.stringify(cell))
                );
            }

            this.cells[cell.x][cell.y] = state;
            this.notifyListeners({
                x: cell.x,
                y: cell.y,
                state: state
            })
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