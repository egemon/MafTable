
define(
    'controller/Rating',
[
    'jquery',
    'microtemplates',

    'model/RatingBase',
    'model/LocalGameStorage',

    'text!view/Rating.html',
], function (
    $,
    tmpl,

    RatingBase,
    LocalGameStorage,

    RatingView
) {
    var Rating = function () {
        console.log('[C > Rating] init');

        //previos month (numeration from 0)
        this.currentRatingFilterObject = {
            periodType: "month",
            period: (new Date()).getMonth()
        };


        this.showCurrentRating = function () {
            var games = LocalGameStorage.getGamesByFilter(this.currentRatingFilterObject);
            var ratingArray = RatingBase.calculateRating(games);
            if (ratingArray.length) {
                this.renderView(ratingArray);
                return true;
            } else {
                console.warn('!!!!!no rating results');
                alert('No games availiable for rating canculation!');
                return false;
            }
        };

        this.renderView = function (ratingArray) {
            $('.form-horizontal').html((tmpl(RatingView, ratingArray)));
        };

        this.getGameRecords = function (З) {
            for (var key in localStorage) {

            }
        };
    };

    return new Rating();
} );
