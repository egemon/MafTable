
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
            var rating = RatingBase.calculateRating();
            this.renderView(rating);
        };

        this.renderView = function (RatingObject) {
            $('.form-horizontal').html((tmpl(RatingView, RatingObject)));
        };

        this.getGameRecords = function (З) {
            for (var key in localStorage) {

            }
        };
    };

    return new Rating();
} );
