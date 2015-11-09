define(
    'controller/Protocol',
[
    'jquery',

    'controller/Timer',
    'controller/Rating',

    'model/LocalGameStorage',
    'model/GameRecord',

    'view/Protocol'
], function (
    $,

//controller
    Timer,
    Rating,

//model
    LocalGameStorage,
    GameRecord,

//view
    ProtocolRenderer
) {
    console.log('{ Controller } [Protocol] init:', arguments);
    var Protocol = function  () {

        //init Timer
        this.timer = new Timer();

        // fieilds
        this.currentDay = 1;
        var ProtocolLink = this;

        //methods
        this.saveGame = function () {
            var gameInfoObject = LocalGameStorage.createGameInfoObject(ProtocolRenderer.collectGameInfo());
            LocalGameStorage.saveGame(gameInfoObject);
        };

        this.loadGame = function () {
            var gameInfoObject = LocalGameStorage.createGameInfoObject(ProtocolRenderer.collectGameInfo());
            var gameId = LocalGameStorage.generateGameId(gameInfoObject.metadata);
            var game = LocalGameStorage.getGamesByFilter({gameId: gameId});
            if (!game) {
                alert('Check date, table and number! No games found');
            } else {
                ProtocolRenderer.clearGame('force');
                ProtocolRenderer.renderLoadedGame(game);
            }
        };

    };

    return new Protocol();
} );

