define(
    'model/GameRecord',
[
    'model/Player',
], function (
    Player
) {
    console.log('[GameRecord] init started with ', arguments);
    var GameRecord = function (metadata, Players, afterdata) {
        this.metadata = metadata;
        this.Players = Players;
        this.afterdata = afterdata;
        this.playerLines = []; // [PlayerLine, PlayerLine ...]
    };

    return GameRecord;
} );
