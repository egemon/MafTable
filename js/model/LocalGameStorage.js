define(
    'model/LocalGameStorage',
[
    'model/GameRecord',
], function (
    GameRecord
) {
    var LocalGameStorage = function () {
        this.games = {};

        this.saveGame = function (GameRecord) {
            this.games[this.generateGameId(StartPage.getMetaData())] = GameRecord;
        };

        this.generateGameId = function (metadata) {
            return '' + metadata.date + metadata.number + metadata.table;
        };

        this.loadGame = function (gameId) {
            View.StartPage.loadGame(this.games[gameId]);
        };

    };

    var singelton = singelton || new LocalGameStorage();
    return singelton;
} );
