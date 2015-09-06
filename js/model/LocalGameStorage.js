define(
    'model/LocalGameStorage',
[
    'model/GameRecord',
], function (
    GameRecord
) {
    console.log('[LocalGameStorage] init started with arg = ', arguments);
    var LocalGameStorage = function () {
        this.games = {};

        this.saveGame = function (GameRecord) {
            this.games[this.generateGameId(GameRecord)] = GameRecord;
            localStorage.setItem(this.generateGameId(GameRecord), GameRecord);
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
