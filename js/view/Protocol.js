define(
    'view/Protocol',
[
    'jquery',
    'jquery-ui',
    'microtemplates',

    'text!templates/Protocol/MetaData.html',
    'text!templates/Protocol/PlayerLine.html',
    'text!templates/Protocol/ButtonBar.html',
    'text!templates/Protocol/DayNight.html',
    'text!templates/Protocol/portGames.html',

    'helper'
], function (
//utils
    $,
    $ui,
    tmpl,

//templates
    MetaData,
    PlayerLineView,
    ButtonBar,
    DayNightView,
    PortView,

    helper
) {

console.log('{View} [Protocol] init');
var ProtocolRenderer = function () {
    var ProtocolV = this;
    var ProtocolС = {};

    this.init = function (ProtocolCtr) {
        ProtocolС = ProtocolCtr;
        //protocol form created
        $('header').append(tmpl(MetaData, {}));
        $('header').append(tmpl(ButtonBar, {}));
        $('.form-horizontal').append(tmpl(PlayerLineView, {}));

        //fields
        this.htmlCache = "";

        //init part
        this.hangEventHeandlersOnFalls();
        this.hangEventHeandlersOnInputs();
        this.hangEventHeandlersOnButtonBar();
        this.addNewDay(this.currentDay);
        this.hangEventHeandlersOnKillAndHang();
    };

    //methods
    this.addNewDay = function (dayNumber) {

        //add headers cells
        var headerRow = $('tr.info');
        addHeader(headerRow, 'Day ' + dayNumber);
        addHeader(headerRow, 'Night ' + dayNumber);

        function addHeader (row, text) {
            var newDay = row.children().eq(-2).clone().text(text);
            row.append(newDay);
        }

        //add other cells
        var rows = $('tr.playerLine');
        addDayNight(rows);

        function addDayNight (rows) {
            for (var i = 0; i < rows.length; i++) {
                rows.eq(i).append(tmpl(DayNightView, {
                    'playerNumber': i + 1,
                    'dayNumber': dayNumber
                }));
            }
        }
    };

    this.collectGameInfo = function () {
        return $('form').serializeArray();
    };

    this.renderLoadedGame = function (game) {
        for (var key in game.metadata) {
            $('[name=' + key +']').val(game.metadata[key]);
        }
        var el = {};
        for (var i = 0; i < game.playerLines.length; i++) {
            var player = game.playerLines[i];
            for (key in player) {
                if (typeof player[key] === 'object') {
                    var Days = player[key];
                    for (var j = 0; j < Days.length; j++) {
                        var day = Days[j];
                        for (var event in day) {
                            el = $('[name=' + i + '_Days_' + j + '_' + event +']');
                            if (day[event] === 'on') {
                                el.prop('checked', 'checked');
                            } else {
                                el.val(day[event]);
                            }
                        }
                    }
                } else {
                    el = $('[name=' + (i+1) + '_' + key +']');
                    if (player[key] === 'on') {
                        el.prop('checked', 'checked');
                    } else {
                        el.val(player[key]);
                    }
                }
            }
        }
    };

    this.clearGame = function (force) {
        if (force || confirm('Are you realy want to clear all data?')) {
            $(':input').not(':checkbox').val('');
            $(':checked').removeAttr('checked');
        }
    };

    this.clearPage = function () {
        $('.form-horizontal').children().remove();
    };

    this.savePage = function () {
        this.htmlCache = document.body.innerHTML;
    };

    //EVENT HANDLERS

    //killed and hanged checkboxes
    this.hangEventHeandlersOnKillAndHang = function () {

        //for every data row
        $('tr.playerLine').each(function(i, el) {

            //take two last checkboxes and set listeners
            $(el).find('.playerHangCheckbox, .playerKillCheckbox')
                .slice(-2).click(function(e) {
                    ProtocolV.toggleDead(this);
            });
        });
    };

    this.toggleDead = function (checkbox) {
        $(checkbox).parents('tr').toggleClass('btn-danger');
    };

    //falls listeners
    this.hangEventHeandlersOnFalls = function () {
        $('.playerfallField').change(function(e) {
            var value = $(this).prop('checked');
            $(this).parent().next().children().attr('disabled', !value);
            $(this).parent().prev().children().attr('disabled', value);
        });
    };

    //autocomplete for nicks
    this.hangEventHeandlersOnInputs = function () {
        var Nicks = ProtocolС.getPlayersNicks();
        $('.playerNameField').add('#refereeField').autocomplete({
          source: Nicks
        });
    };

    //buttonBar listeners
    this.hangEventHeandlersOnButtonBar = function () {
        $('#nextDayButton').click(function(e) {
            ProtocolV.addNewDay(++ProtocolС.currentDay);
            ProtocolV.hangEventHeandlersOnKillAndHang();
        });

        $('#saveGameButton').click(function(e) {
            ProtocolС.saveGame(ProtocolV.collectGameInfo());
        });

        $('#loadGameButton').click(function(e) {
            ProtocolС.loadGame();
        });

        $('#clearGameButton').click(function(e) {
            ProtocolV.clearGame();
        });

        $('#showRatingBtn').click(function (e) {
           ProtocolV.clearPage();
           ProtocolС.timer.reset();
           ProtocolС.initRating();
        });

        $('#exportGamesBtn').click(function (e) {
            var memo = $('<textarea id="memo">').html(ProtocolС.getAllGames()).appendTo('form');
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(memo.get(0));
            window.getSelection().addRange(range);
            var successful = document.execCommand('copy');
            window.getSelection().removeAllRanges();
            memo.remove();
            if (successful) {
                alert('All this games are already in your clipboard!');
            } else {
                memo.appendTo('form');
                alert('Please copy this games from the bottom of page');
            }
        });

        this.showGamesMemo = function (comandName) {
            $('body').append(tmpl(PortView, {games:'', comandName: comandName}));
            $('button').click(function(e){
                var memo = $('stringGames');
                if ($(this).html() == 'Export') {
                    memo.html(ProtocolС.getAllGames());
                    var range = document.createRange();
                    range.selectNode(memo.get(0));
                    window.getSelection().addRange(range);
                    var successful = document.execCommand('copy');
                    if (!successful) {
                        alert('Please copy this games');
                    } else {
                        alert('All this games are already in your clipboard!');
                    }
                    window.getSelection().removeAllRanges();
                } else {

                }
            });
        };

        $('#importGamesBtn').click(function (e) {
            // gamesArray.forEach (function (game, i) {
            //     ProtocolС.saveGame(game);
            // });
            // // TODO
            // // $('body').append(tmpl(PortView, {games:'', comandName: 'Export'}));
            // //JSON.stringify(LocalGameStorage.getAllGames())
            // //.html()
            // var memo = $('<textarea id="memo">').appendTo('form');
            // // window.getSelection().removeAllRanges();
            // // var range = document.createRange();
            // // range.selectNode(memo.get(0));
            // // window.getSelection().addRange(range);
            // memo.focus();
            // var successful = document.execCommand('paste');
            // window.getSelection().removeAllRanges();
            // try {
            //     var gamesArray = JSON.parse(memo.html());
            //     gamesArray.forEach (function (game, i) {
            //         LocalGameStorage.saveGame(game);
            //     });
            // } catch (e){
            //     console.log('[Ctr-Protocol] Error during parsing data', e);
            //     alert('Error, check data type!');
            // }
            // memo.remove();
            // if (successful) {
            //     alert('All this games are already in your clipboard!');
            // } else {
            //     memo.appendTo('form');
            //     alert('Please copy this games from the bottom of page');
            // }
        });
    };

};

return new ProtocolRenderer();
} );
