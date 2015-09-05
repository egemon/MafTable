define(
    'controller/Protocol',
[
    'jquery',
    'microtemplates',
    'text!view/Protocol/Header.html',        
    'text!view/Protocol/MetaData.html',
    'text!view/Protocol/PlayerLine.html',
    'text!view/Protocol/OneDay.html',
], function (
    $,
    tmpl,
    Header,    
    MetaData,
    PlayerLineView,
    OneDayView
) {
    console.log('{ Controller } [Protocol] init:', arguments);
    var Protocol = function  () {

        //protocol form created
        $('.form-horizontal').append(tmpl(Header, {}));
        $('.form-horizontal').append(tmpl(MetaData, {}));
        $('.form-horizontal').append(tmpl(PlayerLineView, {}));

        // fieilds
        this.serverUrl = '/path/to/server';
        this.currentNominateNumber = 1;
        this.currentDay = 1;

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
            
            var headerRow = $('tr.info');
            
            var newDay = headerRow.children().eq(-2)
            .clone().text('Day '+ dayNumber);
            headerRow.append(newDay);
            
            var newNight = headerRow.children().eq(-2)
            .clone().text('Night '+ dayNumber);
            headerRow.append(newNight);


            var row = $('tr.playerLine');

            var data = null;
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < row.length; i++) {
                    data = row.eq(i).children().eq(-2).clone();
                    row.eq(i).append(data);
                }
            }
            



            this.hangEventHeandlersOnCheckboxes();
        };

        //EVENT HANDLERS
        this.hangEventHeandlersOnCheckboxes = function () {
            $('.playerHangCheckbox').click(function(e) {
                markAsDead(this);
            });
            
            $('.playerKillCheckbox').click(function(e) {
                markAsDead(this);
                ProtocolLink.addNewDay(++ProtocolLink.currentDay);
            });

            function markAsDead (checkbox) {
                var row = $(checkbox).parents('tr');
                row.addClass('btn-danger');
                row.find('input').prop('disabled','disabled');
                row.find('select').prop('disabled','disabled');
                
                //TODO
                //send to model that player was hanged
            }

        };

        //init part
        
        var ProtocolLink = this;
        this.hangEventHeandlersOnCheckboxes();


        console.log('this.day1block = ', this.day1block);



    };

    return new Protocol();

} );

