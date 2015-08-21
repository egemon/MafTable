define(
    'Controller',
[
    'microtemplates',
], function (
    tmpl
) {
    console.log('Controller init started');
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


    };

    console.log(tmpl('view/mainForm.ejs'),{data:'ilya'});
    return new Controller();

} );
