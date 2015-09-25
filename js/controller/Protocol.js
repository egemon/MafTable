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
        this.formObject = null;

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

        this.createFormObject = function (gameInfoArray) {
            this.formObject = {};
            for (var i = 0; i < gameInfoArray.length; i++) {
                this.formObject[gameInfoArray[i].name] = $('[name=' + gameInfoArray[i].name +']');
            }
        };

        this.saveGame = function (isAutosave) {
            var gameInfoObject = this.collectGameInfo();
            this.createFormObject($('form').serializeArray());
            LocalGameStorage.saveGame(gameInfoObject);
            // this.autosave = isAutosave;
        };

        this.clearGame = function () {
            if (confirm('Are you realy want to clear all data?')) {
                window.location.reload();
            }
        };

        this.collectGameInfo = function () {
            return new GameRecord($('form').serializeArray());
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
                // TODO
                // $('body').append(tmpl(PortView, {games:'', comandName: 'Export'}));

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

