define(
    'controller/sync',
[

    'jquery',

    // model
    'model/LocalGameStorage',
    'model/RatingBase',

    'helper',
    'text!../../package.json'
], function (
    $,

    LocalGameStorage,
    RatingBase,

    helper,
    appConfig
) {
    console.log('[Sync] inited', arguments);
    appConfig = JSON.parse(appConfig);
    return  {

        isConnected: function () {
            return false;
        },

        $getGamesFromServerByFilter: function (filterObject) {

            filterObject = JSON.stringify(filterObject);
            return $.ajax({
                url: appConfig.serverUrls.syncUrl + '?filterObject=' + filterObject,
                typ: 'GET',
                dataType: 'json'
            })
            .done(function(games) {
                console.log('[Syncronizer] games received:', games);
                LocalGameStorage.saveGameArray(games);
                alert("Games has been taken and saved!");
            }, function (err) {
                alert("Issue with server ot internet!");
                console.warn('[Syncronizer] ERROR receiving games:', err);
            })
            .fail(function(err) {
                alert("Issue with saving!");
                console.warn('[Syncronizer] ERROR saving games:', err);
            })
            .always(function() {
                console.log('[Syncronizer] request for games ends');
            });
        },

        $pushGamesToServerByFilter: function (filterObject) {
            var games = LocalGameStorage.getGamesByFilter(filterObject);
            console.log('[Sync-C] $pushGamesToServerByFilter()', games);
            return $.ajax({
                url: appConfig.serverUrls.syncUrl,
                type: 'POST',
                dataType: 'json',
                data: {"games": JSON.stringify(games)}
            })
            .done(function(data) {
                console.log('[Syncronizer] game pushed:');
            })
            .fail(function(err) {
                console.warn('[Syncronizer] ERROR pushing games:', err);
            })
            .always(function() {
                console.log('[Syncronizer] pushing games ends');
            });
        },

        $syncronizeGameStorages: function () {
            return $.ajax({
                url: appConfig.serverUrls.syncUrl,
                dataType: 'json',
                data: LocalGameStorage ,
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

        }
    };
} );