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
        this.rulesObject = JSON.parse(RatingRules);
        console.log('[M-RatingBase] rulesObject = ', this.rulesObject);
        //period, RatingRules, GameRecords-> RatingObject
        this.calculateRating = function (games, rulesObject) {
            console.log('Rating calculation started');
            var RatingArray = [];
            for (var i = 0; i < games.length; i++) {
                for (var j = 0; j < rulesObject.rules.length; j++) {
                    this.applyRuleToRecord(games[i], rulesObject.rules[j], RatingArray);
                }
            }
            return RatingArray;
        };

        this.applyRuleToRecord = function (GameRecord, RatingRule, RatingArray) {
            console.log('[RatingBase] game adding to rating');
            var PlayerLines = GameRecord.playerLines;
            for (var i = 0; i < PlayerLines.length; i++) {
                if (this.isPlayerSatisfiesRule(PlayerLines[i], GameRecord.metadata, RatingRule) ) {

                }

            }
        };

        this.isPlayerSatisfiesRule = function (PlayerLine, metadata, RatingRule) {
            var isTrue = false;
            $.each(RatingRule.cond, function(key, value){
                if (key === 'metadata') {
                    isTrue = isTrue && this.isMetadataCorrect(metadata, PlayerLine.metadata);
                } else {
                    isTrue = isTrue && PlayerLine[key] === value;
                }
            });
            return isTrue;
        };

        this.isMetadataCorrect = function (ruleMetadata, playerLineMetadata) {
            var isTrue = false;
            $.each(ruleMetadata, function (key, val) {
                isTrue = isTrue && playerLineMetadata[key] === val;
            });
            return isTrue;
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
