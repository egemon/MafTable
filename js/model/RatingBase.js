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

    };



    return new RatingBase(LocalGameStorage);
} );
