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




        this.calculateRating = function (games, rulesObjecct) {
            console.log('Rating calculation started');
            return {"Players":[
                {
                    name:'Merlin',
                    sum: 20,
                    gameNumber: 10,
                    average: 2,
                    bp: 3,
                    br: 1,
                },{
                    name:'JAck',
                    sum: 2,
                    gameNumber: 1,
                    average: 5,
                    bp: 3,
                    br: 2,
                },{
                    name:'Ilya',
                    sum: 200,
                    gameNumber: 100,
                    average: 2.55555,
                    bp: 0,
                    br: 0,
                },{
                    name:'Borman',
                    sum: 30,
                    gameNumber: 10,
                    average: 3,
                    bp: 1,
                    br: 1,
                },{
                    name:'Klich',
                    sum: 2,
                    gameNumber: 10,
                    average: 0.2,
                    bp: 1,
                    br: 0,
                },{
                    name:'Loh',
                    sum: 1,
                    gameNumber: 3,
                    average: 0.333333333,
                    bp: 0,
                    br: 0,
                },
            ]};
        };

    };

    return new RatingBase(LocalGameStorage);
} );
