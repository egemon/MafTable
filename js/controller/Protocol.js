define(
    'controller/Protocol',
[
    'jquery',
    'jquery-ui',
    'microtemplates',

    'text!view/Protocol/MetaData.html',
    'text!view/Protocol/PlayerLine.html',
    'text!view/Protocol/ButtonBar.html',
    'text!view/Protocol/DayNight.html',
    'text!view/Protocol/portGames.html',

    'controller/Timer',
    'controller/Rating',

    'model/LocalGameStorage',
    'model/GameRecord'
], function (
    $,
    $ui,
    tmpl,

//view
    MetaData,
    PlayerLineView,
    ButtonBar,
    DayNightView,
    PortView,

//controller
    Timer,
    Rating,

//model
    LocalGameStorage,
    GameRecord
) {
    console.log('{ Controller } [Protocol] init:', arguments);
    var Protocol = function  () {

        //protocol form created
        $('header').append(tmpl(MetaData, {}));
        $('header').append(tmpl(ButtonBar, {}));

        //init Timer
        this.timer = new Timer();

        $('.form-horizontal').append(tmpl(PlayerLineView, {}));

        // fieilds
        this.currentDay = 1;
        var ProtocolLink = this;

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

        this.saveGame = function (isAutosave) {
            var gameInfoObject = LocalGameStorage.createGameInfoObject($('form').serializeArray());
            LocalGameStorage.saveGame(gameInfoObject);
            // this.autosave = isAutosave;
        };

        this.renderLoadedGame = function (game) {
            for (var key in game.metadata) {
                $('[name=' + key +']').val(game.metadata[key]);
            }
            for (var i = 0; i < game.playerLines.length; i++) {
                var player = game.playerLines[i];
                for (var key in player) {
                    if (typeof player[key] === 'object') {
                        var Days = player[key];
                        for (var j = 0; j < Days.length; j++) {
                            var day = Days[j];
                            for (var event in day) {
                                var el = $('[name=' + i + '_Days_' + j + '_' + event +']');
                                if (day[event] === 'on') {
                                    el.prop('checked', 'checked');
                                } else {
                                    el.val(day[event]);
                                }
                            }
                        }
                    } else {
                        var el = $('[name=' + (i+1) + '_' + key +']');
                        if (player[key] === 'on') {
                            el.prop('checked', 'checked');
                        } else {
                            el.val(player[key]);
                        }
                    }
                }
            }
        };

        this.loadGame = function () {
            var gameInfoObject = LocalGameStorage.createGameInfoObject($('form').serializeArray());
            var gameId = LocalGameStorage.generateGameId(gameInfoObject.metadata);
            var game = LocalGameStorage.getGamesByFilter({gameId: gameId});
            if (!game) {
                alert('Check date, table and number! No games found');
            } else {
                ProtocolLink.clearGame('force');
                this.renderLoadedGame(game);
            }
        };

        this.clearGame = function (force) {
            if (force || confirm('Are you realy want to clear all data?')) {
                $(':input').not(':checkbox').val('');
                $(':checked').removeAttr('checked');
            }
        };

        this.savePage = function () {
            this.htmlCache = document.body.innerHTML;
        };

        this.clearPage = function () {
            $('.form-horizontal').children().remove();
        };


        //EVENT HANDLERS
        this.hangEventHeandlersOnKillAndHang = function () {

            //for every data row
            $('tr.playerLine').each(function(i, el) {

                //take two last checkboxes and set listeners
                $(el).find('.playerHangCheckbox, .playerKillCheckbox')
                    .slice(-2).click(function(e) {
                        toggleDead(this);
                });
            });

            function toggleDead (checkbox) {
                $(checkbox).parents('tr').toggleClass('btn-danger');
            }
        };

        this.hangEventHeandlersOnFalls = function () {

            //falls listeners
            $('.playerfallField').change(function(e) {
                var value = $(this).prop('checked');
                $(this).parent().next().children().attr('disabled', !value);
                $(this).parent().prev().children().attr('disabled', value);
            });

        };

        this.hangEventHeandlersOnInputs = function () {
            var Nicks = LocalGameStorage.getPlayersNicks();
            $('.playerNameField').add('#refereeField').autocomplete({
              source: Nicks
            });
        };

        this.showGamesMemo = function (comandName) {
            $('body').append(tmpl(PortView, {games:'', comandName: comandName}));
            $('button').click(function(e){
                var memo = $('stringGames');
                if ($(this).html() == 'Export') {
                    memo.html(JSON.stringify(LocalGameStorage.getAllGames()));
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

        this.hangEventHeandlersOnButtonBar = function () {
            $('#nextDayButton').click(function(e) {
                ProtocolLink.addNewDay(++ProtocolLink.currentDay);
                ProtocolLink.hangEventHeandlersOnKillAndHang();
                // autosave option
                ProtocolLink.saveGame(true); // true = autosave
            });

            $('#saveGameButton').click(function(e) {
                ProtocolLink.saveGame();
            });

            $('#loadGameButton').click(function(e) {
                ProtocolLink.loadGame();
            });

            $('#clearGameButton').click(function(e) {
                ProtocolLink.clearGame();
            });

            $('#showRatingBtn').click(function (e) {
               ProtocolLink.saveGame();
               ProtocolLink.clearPage();
               ProtocolLink.timer.reset();
               if (!Rating.init()) {
                    //TODO: handle when no games in filter
               }
            });

            $('#exportGamesBtn').click(function (e) {
                var memo = $('<textarea id="memo">').html(JSON.stringify(LocalGameStorage.getAllGames())).appendTo('form');
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

            $('#importGamesBtn').click(function (e) {
                var gamesArray = [{"metadata":{"win":"maf","ref":"Заяц","date":"2015-09-08","gameNumber":"1","tableName":"Baker Street"},"playerLines":[{"Days":[],"name":"Тракиец","role":"r"},{"Days":[],"name":"Симон","role":"s"},{"Days":[],"name":"Мейбал","role":"r"},{"Days":[],"name":"Пинокио","role":"d"},{"Days":[],"name":"Эльза","role":"r"},{"Days":[],"name":"Папканцилер","role":"r"},{"Days":[],"name":"Доктор","role":"r"},{"Days":[],"name":"Сыть","role":"r"},{"Days":[],"BP":"on","name":"Отец","role":"b"},{"Days":[],"name":"Мать","role":"b"}]},{"metadata":{"win":"city","ref":"Клич","date":"2015-09-08","gameNumber":"1","tableName":"Downing Street"},"playerLines":[{"Days":[],"name":"Художник","role":"s"},{"Days":[],"name":"Баффет","role":"r"},{"Days":[],"name":"Брат 2","role":"r"},{"Days":[],"name":"Стоун Колд","role":"r"},{"Days":[],"name":"Эмбер","role":"r"},{"Days":[],"BR":"on","name":"Вагрант","role":"r"},{"Days":[],"name":"Викарий","role":"b"},{"Days":[],"name":"Джонни","role":"b"},{"Days":[],"BP":"on","name":"СБ","role":"r"},{"Days":[],"name":"Борман","role":"d"}]},{"metadata":{"win":"city","ref":"50","date":"2015-09-08","gameNumber":"1","tableName":"Fleet Street"},"playerLines":[{"Days":[],"name":"Кристон","role":"r"},{"Days":[],"name":"Кураре","role":"r"},{"Days":[],"BR":"on","name":"Мутный","role":"s"},{"Days":[],"name":"Джеки","role":"r"},{"Days":[],"BR":"on","name":"Ежик","role":"b"},{"Days":[],"name":"Пинокио","role":"b"},{"Days":[],"name":"Джессика","role":"r"},{"Days":[],"name":"Джонни","role":"r"},{"Days":[],"name":"Едмак","role":"d"},{"Days":[],"name":"Супер 8","role":"r"}]},{"metadata":{"win":"maf","ref":"Заяц","date":"2015-09-08","gameNumber":"2","tableName":"Baker Street"},"playerLines":[{"Days":[],"name":"Эльза","role":"r"},{"Days":[],"name":"Пантий","role":"r"},{"Days":[],"name":"Доктор","role":"d"},{"Days":[],"name":"Гендальф","role":"b"},{"Days":[],"name":"Отец","role":"s"},{"Days":[],"BR":"on","name":"Мать","role":"r"},{"Days":[],"BR":"on","name":"Халявщик","role":"b"},{"Days":[],"name":"Сыть","role":"r"},{"Days":[],"name":"Тракиец","role":"r"},{"Days":[],"name":"Вагрант","role":"r"}]},{"metadata":{"win":"maf","ref":"Стоун Колд","date":"2015-09-08","gameNumber":"2","tableName":"Downing Street"},"playerLines":[{"Days":[],"name":"Баффет","role":"r"},{"Days":[],"name":"Клич","role":"r"},{"Days":[],"name":"Брат 2","role":"r"},{"Days":[],"name":"СБ","role":"s"},{"Days":[],"name":"Викарий","role":"r"},{"Days":[],"BR":"on","name":"Борман","role":"d"},{"Days":[],"name":"Художник","role":"b"},{"Days":[],"BP":"on","name":"Зло","role":"r"},{"Days":[],"name":"Эмбер","role":"r"},{"Days":[],"name":"Феникс","role":"b"}]},{"metadata":{"win":"city","ref":"50","date":"2015-09-08","gameNumber":"2","tableName":"Fleet Street"},"playerLines":[{"Days":[],"name":"Мать","role":"r"},{"Days":[],"name":"Отец","role":"r"},{"Days":[],"name":"Эльза","role":"d"},{"Days":[],"name":"Сыч","role":"r"},{"Days":[],"name":"Мейбелин","role":"r"},{"Days":[],"name":"Супер 8","role":"r"},{"Days":[],"name":"Кристон","role":"b"},{"Days":[],"name":"Динни","role":"r"},{"Days":[],"name":"Художник","role":"b"},{"Days":[],"name":"Штефан","role":"s"}]},{"metadata":{"win":"maf","ref":"Заяц","date":"2015-09-08","gameNumber":"3","tableName":"Baker Street"},"playerLines":[{"Days":[],"name":"Кураре","role":"r"},{"Days":[],"name":"Мутный","role":"s"},{"Days":[],"BP":"on","name":"Айдахо","role":"b"},{"Days":[],"name":"Тракиец","role":"r"},{"Days":[],"name":"Феникс","role":"d"},{"Days":[],"BR":"on","name":"Ежик","role":"r"},{"Days":[],"name":"Эмбер","role":"r"},{"Days":[],"name":"Пантий","role":"r"},{"Days":[],"name":"Близнец","role":"b"},{"Days":[],"name":"Халявщик","role":"r"}]},{"metadata":{"win":"city","ref":"Клич","date":"2015-09-08","gameNumber":"3","tableName":"Fleet Street"},"playerLines":[{"Days":[],"BP":"on","name":"Зло","role":"r"},{"Days":[],"name":"Вагрант","role":"r"},{"Days":[],"name":"Мерлин","role":"b"},{"Days":[],"name":"Викарий","role":"r"},{"Days":[],"name":"Гендальф","role":"s"},{"Days":[],"name":"СБ","role":"d"},{"Days":[],"name":"Борман","role":"r"},{"Days":[],"name":"Баффет","role":"b"},{"Days":[],"BR":"on","name":"Стоун Колд","role":"r"},{"Days":[],"name":"Художник","role":"r"}]},{"metadata":{"win":"maf","ref":"Заяц","date":"2015-09-08","gameNumber":"4","tableName":"Baker Street"},"playerLines":[{"Days":[],"name":"Феникс","role":"d"},{"Days":[],"name":"Ежик","role":"r"},{"Days":[],"name":"Близнец","role":"r"},{"Days":[],"name":"Мутный","role":"b"},{"Days":[],"name":"Халявщик","role":"s"},{"Days":[],"name":"Пантий","role":"r"},{"Days":[],"name":"Кураре","role":"r"},{"Days":[],"name":"Вагрант","role":"b"},{"Days":[],"name":"Эмбер","role":"r"},{"Days":[],"name":"Айдахо","role":"r"}]},{"metadata":{"win":"maf","ref":"50","date":"2015-09-08","gameNumber":"4","tableName":"Fleet Street"},"playerLines":[{"Days":[],"name":"Викарий","role":"r"},{"Days":[],"name":"Стоун Колд","role":"s"},{"Days":[],"name":"Борман","role":"r"},{"Days":[],"name":"Баффет","role":"r"},{"Days":[],"name":"СБ","role":"r"},{"Days":[],"name":"Зло","role":"d"},{"Days":[],"name":"Космос","role":"r"},{"Days":[],"name":"Тракиец","role":"b"},{"Days":[],"name":"Отец","role":"r"},{"Days":[],"name":"Клич","role":"b"}]},{"metadata":{"win":"","ref":"","date":"2015-09-28","gameNumber":"1","tableName":"Baker Street"},"playerLines":[{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"},{"Days":[],"role":"r"}]}];
                gamesArray.forEach (function (game, i) {
                    LocalGameStorage.saveGame(game);
                });
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

        //init part
        this.hangEventHeandlersOnFalls();
        this.hangEventHeandlersOnInputs();
        this.hangEventHeandlersOnButtonBar();
        this.addNewDay(this.currentDay);
        this.hangEventHeandlersOnKillAndHang();

    };

    return new Protocol();
} );

