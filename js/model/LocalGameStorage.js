define(
    'model/LocalGameStorage',
[
    'model/GameRecord',
], function (
    GameRecord
) {
    console.log('[LocalGameStorage] init started with arg = ', arguments);
    var LocalGameStorage = function () {

        this.saveGame = function (GameRecord) {
            var id = this.generateGameId(GameRecord.metadata);
            localStorage.setItem(id, JSON.stringify(GameRecord));
        };

        this.loadGame = function (gameId) {
            View.StartPage.loadGame(this.games[gameId]);
        };

        this.resetGameStorage = function () {
            localStorage.clear();
        };

        this.generateGameId = function (metadata) {
            return ['MT', metadata.date, metadata.gameNumber, metadata.tableName].join('_');
        };


    };

    var singelton = singelton || new LocalGameStorage();
    return singelton;
} );
