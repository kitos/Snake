(function ($) {
    'use strict';

    var colors = {
        free: 'white',
        snake: 'green',
        frog: 'yellow'
    }

    var pg = window.Playground = Playground;

    function Playground($elem, model) {
        var $table = $('<table/>').appendTo($elem);

        for (var i = 0; i < model.height(); i++) {
            var $row = $('<tr/>').appendTo($table);

            for (var j = 0; j < model.width(); j++) {
                var $cell = $('<td/>').appendTo($row);
            }
        }

        model.addListener(function (cell) {
            $table.find('tr:eq(' + cell.y + ') td:eq(' + cell.x + ')')
                .css({
                    'background-color': colors[cell.state]
                });
        })
    }

})(jQuery);