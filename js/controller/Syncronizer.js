define(
    'Syncronizer',
[

    'jquery',

    //model
    'LocalGameStorage',
    'RatingBase',

    'helper'
], function (
    $,

    LocalGameStorage,
    RatingBase,

    helper
) {
    console.log('[Syncronizer] inited');
    return  {

        isConnected: function () {
            return false;
        },

        $getGamesFromServerByFilter: function (filterObject) {
            return helper.$makeSyncRequest()

            $.ajax({
                url: appConfig.serverUrls.syncUrl,
                dataType: 'json',
                data: filterObject,
            })
            .done(function(data) {
                console.log('[Syncronizer] games received:', data);
                LocalGameStorage.saveGame(JSON.parse(data));
            })
            .fail(function(err) {
                console.warn('[Syncronizer] ERROR receiving games:', err);
            })
            .always(function() {
                console.log('[Syncronizer] request for games ends');
            });
        },

        $pushGameToServer: function (gameRecord) {
            return $.ajax({
                url: appConfig.serverUrls.syncUrl,
                dataType: 'json',
                data: gameRecord,
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