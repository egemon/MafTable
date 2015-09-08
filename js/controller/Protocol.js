define(
    'controller/Protocol',
[
    'jquery',

    'microtemplates',
    'text!view/Protocol/Header.html',
    'text!view/Protocol/MetaData.html',
    'text!view/Protocol/PlayerLine.html',
    'text!view/Protocol/ButtonBar.html',
    'text!view/Protocol/DayNight.html',

    'model/LocalGameStorage',
    'model/GameRecord'
], function (
    $,

    tmpl,
    Header,
    MetaData,
    PlayerLineView,
    ButtonBar,
    DayNightView,

    LocalGameStorage,
    GameRecord
) {
    console.log('{ Controller } [Protocol] init:', arguments);
    var Protocol = function  () {

        //protocol form created
        $('.form-horizontal').append(tmpl(Header, {}));
        $('.form-horizontal').append(tmpl(MetaData, {}));
        $('.form-horizontal').append(tmpl(PlayerLineView, {}));
        $('body').append(tmpl(ButtonBar, {}));

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
            LocalGameStorage.saveGame(this.collectGameInfo());
            this.autosave = isAutosave;
        };

        this.collectGameInfo = function () {
            return new GameRecord($('form').serializeArray());
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
                //TODO
                //send to model that player was hanged
            }
        };

        this.hangEventHeandlersOnFalls = function () {
            //falls listeners
            $('.playerfallField').click(function(e) {
                var prev = this.parent().prev();
                var next = this.parent().next();
                var value = this.prop('checked');
                this.attr('disabled') ? this.attr('disabled', '') : this.attr('disabled', 'disabled');
                this.parent().next().attr('disabled', !value);
                ///TODO end implementation
            });

        };

        this.hangEventHeandlersOnButtonBar = function () {
            $('#nextDayButton').click(function(e) {
                ProtocolLink.addNewDay(++ProtocolLink.currentDay);
                ProtocolLink.hangEventHeandlersOnKillAndHang();

                //autosave option
                ProtocolLink.saveGame(true); // true = autosave
            });

            $('#saveGameButton').click(function(e) {
                ProtocolLink.saveGame();
            });
        };

        //init part
        this.hangEventHeandlersOnFalls();
        this.hangEventHeandlersOnButtonBar();
        this.addNewDay(this.currentDay);
        this.hangEventHeandlersOnKillAndHang();
        $('table').width(1100);
    };

    return new Protocol();
} );

