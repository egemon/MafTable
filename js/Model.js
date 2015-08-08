define(
    'Model',
[
    'model/Player',
    'model/GameRecord',
    'model/LocalGameStorage',
    'model/PlayerBase',
    'model/PlayerLine',
    'model/RatingBase'
], function (
    Player,
    GameRecord,
    LocalGameStorage,
    PlayerBase,
    PlayerLine,
    Controller,
    RatingBase
) {
    console.log('Model init strated with args = ', arguments);
    console.log('args = ', arguments);

    function Model () {
        this.LocalGameStorage = LocalGameStorage;
        this.PlayerBase = PlayerBase;
        this.RatingBase = RatingBase;
    }

    return new Model();

} );
