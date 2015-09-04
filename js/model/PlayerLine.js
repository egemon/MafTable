define(
    'model/PlayerLine',
[
], function (
) {
    console.log('[PlayerLine] init:', arguments);
    var PlayerLine = function () {
        this.id = id;
        this.nick = nick;
        this.role = role;
        this.status = 'alive';
        this.isBestForPlayers = isBestForPlayers;
        this.isBestForJudge = isBestForJudge;
        this.playerId = playerId;
//////////////////////////////////
    };

    return PlayerLine;
});
