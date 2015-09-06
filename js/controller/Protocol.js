define(
    'controller/Protocol',
[
    'jquery',

    'microtemplates',
    'text!view/Protocol/Header.html',
    'text!view/Protocol/MetaData.html',
    'text!view/Protocol/PlayerLine.html',
    'text!view/Protocol/ButtonBar.html',
    'text!view/Protocol/OneDay.html',

    'model/LocalGameStorage',
    'model/GameRecord'
], function (
    $,

    tmpl,
    Header,
    MetaData,
    PlayerLineView,
    ButtonBar,
    OneDayView,

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
        this.pullFromServer = function  () {
            $.ajax({
                url: this.serverUrl,
                dataType: 'json',
            })
            .done(successPull)
            .fail(failPull);

            function successPull (data) {
                for (var i = 0; i < data.length; i++) {
                    localStorage.setItem(data[i].id, data[i]);
                }
            }
            function failPull (err) {
                console.log('err = ', err);
            }
        };

        this.pushToServer = function  () {
            localStorage.each(function(i, el) {
                $.ajax({
                        url: this.serverUrl,
                        type: 'post',
                        data: el,
                    })
                .done(successPull)
                .fail(failPull);
                var allSyncronized  = i;
            });

            function successPush (data) {
                if (--allSyncronized === 0) {
                    alert('All games pushed');
                }
            }
            function failPush (err) {
                alert('Error during syncronization');
            }
        };


        this.addNewDay = function (dayNumber) {

            //add headers cells
            var headerRow = $('tr.info');
            addPart(headerRow).text('Day ' + dayNumber);
            addPart(headerRow).text('Night ' + dayNumber);

            //add other cells
            var rows = $('tr.playerLine');
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < rows.length; i++) {
                    addPart(rows.eq(i));
                }
            }

            function addPart (row) {
                var newDay = row.children().eq(-2).clone();
                row.append(newDay);
                newDay.find('[type=checkbox]').prop('checked', false);
                return newDay;
            }

            //increase width of table
            $('#gameInfoTable').width($('#gameInfoTable').width() + 352);
        };

        this.saveGame = function () {
            LocalGameStorage.saveGame(this.collectGameInfo());
        };

        this.collectGameInfo = function () {
            return new GameRecord($('form').serializeArray());
        };

        //EVENT HANDLERS
        this.hangEventHeandlersOnCheckboxes = function () {
            
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

        this.hangEventHeandlersOnButtonBar = function () {
            $('#nextDayButton').click(function(e) {
                ProtocolLink.addNewDay(++ProtocolLink.currentDay);
                ProtocolLink.hangEventHeandlersOnCheckboxes();
            });

            $('#saveGameButton').click(function(e) {
                ProtocolLink.saveGame();
            });
        };

        //init part
        this.hangEventHeandlersOnCheckboxes();
        this.hangEventHeandlersOnButtonBar();
    };

    return new Protocol();
} );

