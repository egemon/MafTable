define(
    'model/Game',
[
    'model/Player',
    'view/StartPage'
], function (
    Player,
    StartPage
) {
    var Game = function (metadata, Players, afterdata) {
        this.metadata = metadata;
        this.Players = Players;
        this.afterdata = afterdata;
        this.playerLines = []; // [PlayerLine, PlayerLine ...]
    };


////////////////////////////////////////////////////////
    Game.prototype.start = function () {
        StartPage.getMetaData()
    };

    return Game;
} );
