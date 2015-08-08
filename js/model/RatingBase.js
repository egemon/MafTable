define(
    'RatingBase',
[
    'PlayerLine',
    'Player',
    'LocalGameStorage',
    'ratingRules.json'
], function ( PlayerLine, Player, LocalGameStorage, ratingRules) {
    console.log('RatingBase init started');
    console.log('args = ', arguments);
    var RatingBase = function (LocalGameStorage) {
        this.rules = ratingRules;
        this.gameSet = []; // [GameRecord, GameRecord]
        this.calculateRating = function () {
            console.log('Rating calculation started');

        }

        this.addGameToRating = function (GameRecord) {
            console.log('[RatingBase] game adding to rating');
            this.gameSet.push(GameRecord);
        }


    }

    return new RatingBase(LocalGameStorage);
} );
