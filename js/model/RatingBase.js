define(
    'model/RatingBase',
[
    'model/PlayerLine',
    'model/Player',
    'model/LocalGameStorage',
], function ( PlayerLine, Player, LocalGameStorage) {
    console.log('[RatingBase] init:', arguments);
    var RatingBase = function (LocalGameStorage) {
        // this.rules = ratingRules;
        this.gameSet = []; // [GameRecord, GameRecord]
        this.calculateRating = function () {
            console.log('Rating calculation started');

        };

        this.addGameToRating = function (GameRecord) {
            console.log('[RatingBase] game adding to rating');
            this.gameSet.push(GameRecord);
        };


    };

    return new RatingBase(LocalGameStorage);
} );
