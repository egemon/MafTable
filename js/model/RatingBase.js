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
        this.calculateRating = function (games) {
            console.log('Rating calculation started');
            var RatingObject = {};
            for (var i = 0; i < games.length; i++) {
                for (var j = 0; j < this.rulesObject.rules.length; j++) {
                    this.applyRuleToRecord(games[i], this.rulesObject.rules[j], RatingObject);
                }
                for (var k = 0; k < games[i].playerLines.length; k++) {
                    RatingObject[games[i].playerLines[k].name].gameNumber = RatingObject[games[i].playerLines[k].name].gameNumber ?
                     ++RatingObject[games[i].playerLines[k].name].gameNumber : 1;
                    if (games[i].playerLines[k].BP) {
                        RatingObject[games[i].playerLines[k].name].BP = RatingObject[games[i].playerLines[k].name].BP ? ++RatingObject[games[i].playerLines[k].name].BP : 1;  
                    }
                    if (games[i].playerLines[k].BR) {
                        RatingObject[games[i].playerLines[k].name].BR = RatingObject[games[i].playerLines[k].name].BR ? ++RatingObject[games[i].playerLines[k].name].BR : 1;  
                    }
                };
            }
            var RatingArray = this.sortPlayersToArray(RatingObject, "average");
            return RatingArray;
        };

        this.applyRuleToRecord = function (GameRecord, RatingRule, RatingObject) {
            console.log('[RatingBase] game adding to rating');
            var PlayerLines = GameRecord.playerLines;
            if (!RatingRule.condition.metadata || (GameRecord.metadata && this.isMetadataCorrect(GameRecord.metadata, RatingRule.condition.metadata))) {
                for (var i = 0; i < PlayerLines.length; i++) {
                    var player = PlayerLines[i];
                    if (!RatingRule.condition.player || this.isPlayerCorrect(player, RatingRule.condition.player)) {
                        if (RatingObject[player.name]) {
                            RatingObject[player.name].sum += RatingRule.value;
                        } else {
                            RatingObject[player.name] = {};
                            RatingObject[player.name].sum = RatingRule.value;
                        }
                    }
                    // if (RatingObject[player.name] && player.BP) {
                    //   RatingObject[player.name].BP +=  1;  
                    // }
                    // if (RatingObject[player.name] && player.BR) {
                    //   RatingObject[player.name].BR +=  1;  
                    // }
                }
            }
        };

        this.isPlayerCorrect = function (player, playerCondition) {
            var isTrue = true;
            $.each(playerCondition, function(key, value){
                isTrue = isTrue && player[key] === value;
            });
            return isTrue;
        };

        this.isMetadataCorrect = function (metadata, ruleMetadata) {
            var isTrue = true;
            $.each(ruleMetadata, function (key, val) {
                isTrue = isTrue && metadata[key] === val;
            });
            return isTrue;
        };

        this.sortPlayersToArray = function (RatingObject, byString) {
            if (byString === 'average') {
                return $.map(RatingObject, function (key, value) {
                    key.name = value;
                    return [key] 
                }).sort(function(a, b){return a.sum/a.gameNumber < b.sum/b.gameNumber})
            } else {
                console.warn('I don;t know this sort!');
            }
        }

        // this.calculateRating = function (games, rulesObjecct) {
        //     console.log('Rating calculation started');
        //     return {"Players":[
        //         {
        //             name:'Merlin',
        //             sum: 20,
        //             gameNumber: 10,
        //             average: 2,
        //             bp: 3,
        //             br: 1,
        //         },{
        //             name:'JAck',
        //             sum: 2,
        //             gameNumber: 1,
        //             average: 5,
        //             bp: 3,
        //             br: 2,
        //         },{
        //             name:'Ilya',
        //             sum: 200,
        //             gameNumber: 100,
        //             average: 2.55555,
        //             bp: 0,
        //             br: 0,
        //         },{
        //             name:'Borman',
        //             sum: 30,
        //             gameNumber: 10,
        //             average: 3,
        //             bp: 1,
        //             br: 1,
        //         },{
        //             name:'Klich',
        //             sum: 2,
        //             gameNumber: 10,
        //             average: 0.2,
        //             bp: 1,
        //             br: 0,
        //         },{
        //             name:'Loh',
        //             sum: 1,
        //             gameNumber: 3,
        //             average: 0.333333333,
        //             bp: 0,
        //             br: 0,
        //         },
            // ]
        // };
        // };

    };



    return new RatingBase(LocalGameStorage);
} );
