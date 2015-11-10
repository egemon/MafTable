
define(
    'controller/Rating',
[
    'jquery',
    'microtemplates',

    'model/RatingBase',
    'model/LocalGameStorage',

    'view/Rating'
], function (
    $,
    tmpl,

    RatingBase,
    LocalGameStorage,

    RatingV
) {
    var Rating = function () {
        console.log('[C > Rating] init');
        var RatingLink = this;
        var ProtocolC = {};
        this.init = function (ProtocolCtr) {
            RatingV.init(this);
            ProtocolC = ProtocolCtr;
        };

        //previos month (numeration from 0)
        this.currentRatingFilterObject = {
            periodType: "month",
            period: (new Date()).getMonth() + 1
        };

        this.getRatingArray = function (RatingFilterObject) {
            var games = LocalGameStorage.getGamesByFilter(RatingFilterObject || this.currentRatingFilterObject);
            return RatingBase.calculateRating(games);
        };

        this.initProtocol = function () {
            ProtocolC.init();
        };
    };

    return new Rating();
} );
