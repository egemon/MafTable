define(
    'model/LocalGameStorage',
[
    'model/Game',
    'model/StartPage'
], function (
    Game,
    StartPage
) {
    var LocalGameStorage = function () {
        this.games = {};

        this.saveGame = function (Game) {
            this.games[this.generateGameId(StartPage.getMetaData())] = Game;
        };

        this.generateGameId = function (metadata) {
            return '' + metadata.date + metadata.number + metadata.table;
        };

        this.loadGame = function (gameId) {
            StartPage.loadGame(this.games[gameId]);
        };

    };

    var singelton = singelton || new LocalGameStorage();
    return singelton;
} );
