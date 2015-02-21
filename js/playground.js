(function ($) {
    'use strict';

    var classes = {
        free: 'free',
        snake: 'snake',
        frog: 'frog'
    };

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
                .removeClass(Object.keys(classes).join(' '))
                .addClass(classes[cell.state]);
        })
    }

})(jQuery);