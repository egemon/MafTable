define(
    'Controller',
[
    'jquery',
    'microtemplates',
    'fs',
    'text!view/PlayerLine.html',
    'text!view/MetaData.html',
], function (
    $,
    tmpl,
    fs,
    PlayerLineView,
    MetaData
) {
    console.log('[Controller] init:', arguments);
    var Controller = function  () {
        this.serverUrl = '/path/to/server';

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
        console.log(PlayerLineView);
        // var view = require('text!../js/view/mainForm.html');
        var result = tmpl(PlayerLineView, {data:'ilya'});
        console.log(result);

        $('.form-horizontal').append(tmpl(MetaData, {}));
        $('.form-horizontal').append(tmpl(PlayerLineView, {}));

    };

    // fs.readFile(__dirname + '/e.txt', function  (err, mainForm) {
    //     console.log('err = ', err);
    //     console.log('mainForm = ', mainForm);
    //     console.log(tmpl(mainForm,{data:'ilya'}));

    // });

    return new Controller();

} );

