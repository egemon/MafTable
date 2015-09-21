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
        this.calculateRating = function (period, rulesObjecct, GameRecords) {
            console.log('Rating calculation started');
            var Games = this.getGamesForPeriod(period);
        };

        this.getGamesForPeriod = function (period) {
            for (var i = 0; i < localStorage.length; i++) {
                localStorage.key(i).indexOf('MT');
            }
        };

        this.addGameToRating = function (GameRecord) {
            console.log('[RatingBase] game adding to rating');
            this.gameSet.push(GameRecord);
        };


    };

    return new RatingBase(LocalGameStorage);
} );
