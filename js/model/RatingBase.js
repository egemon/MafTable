define(
    'model/RatingBase',
[
    'model/PlayerLine',
    'model/Player',
    'model/LocalGameStorage',
    'text!model/RatingRules.json'
], function ( PlayerLine, Player, LocalGameStorage, RatingRules) {
    console.log('[RatingBase] init:', arguments);
    var RatingBase = function () {
        this.rulesObjecct = JSON.parse(RatingRules);
        console.log('[M-RatingBase] rulesObjecct = ', this.rulesObjecct);
        //period, RatingRules, GameRecords-> RatingObject
        this.calculateRating = function (games, rulesObjecct) {
            console.log('Rating calculation started');

        };

        this.addGameToRating = function (GameRecord) {
            console.log('[RatingBase] game adding to rating');
            this.gameSet.push(GameRecord);
        };


    };

    return new RatingBase(LocalGameStorage);
} );
