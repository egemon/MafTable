define(
    'controller/Protocol',
[
    'controller/Timer',
    'controller/Rating',

    'model/LocalGameStorage',
    'model/GameRecord',

    'view/Protocol'
], function (
//controller
    Timer,
    Rating,

//model
    LocalGameStorage,
    GameRecord,

//view
    ProtocolV
) {
    var Protocol = function  () {
        this.init = function () {
        console.log('[Protocol{C}] init:', arguments);
            // fieilds
            this.currentDay = 1;
            var ProtocolLink = this;
            ProtocolV.init(this);
            this.timer = new Timer();
        };

        //methods
        this.saveGame = function (gameInfoArray) {
            var gameInfoObject = LocalGameStorage.createGameInfoObject(gameInfoArray);
            LocalGameStorage.saveGame(gameInfoObject);
        };

        this.loadGame = function () {
            var gameInfoObject = LocalGameStorage.createGameInfoObject(ProtocolV.collectGameInfo());
            var gameId = LocalGameStorage.generateGameId(gameInfoObject.metadata);
            var game = LocalGameStorage.getGamesByFilter({gameId: gameId});
            if (!game) {
                alert('Check date, table and number! No games found');
            } else {
                ProtocolV.clearGame('force');
                ProtocolV.renderLoadedGame(game);
            }
        };

        this.initRating = function () {
            Rating.init(this);
        };

        this.getPlayersNicks = function () {
            return LocalGameStorage.getPlayersNicks();
        };

        this.getAllGames = function () {
            return JSON.stringify(LocalGameStorage.getAllGames());
        };

    };

    return new Protocol();
} );

