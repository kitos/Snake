(function () {
    'use strict';

    var keyCodes = {
        65: 'left',
        87: 'top',
        68: 'right',
        83: 'bottom'
    }

    var pgModel = new PlaygroundModel(20, 40),
        snake = new Snake(pgModel, 10),
        pg = new Playground($('.js-playground'), pgModel);

    (function start() {
        var intervalID = setInterval(function () {
            try {
                snake.move();
            } catch (e) {
                console.error('game over', e.message);
                clearInterval(intervalID);
            }
        }, 200);
    })();

    $(document).keyup(function (event) {
        var direction = keyCodes[event.which];
        if (direction) {
            snake.turn(direction);
        }
    });
})();