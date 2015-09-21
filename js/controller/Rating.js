define(
    'controller/Rating',
[
    'jquery',
    'microtemplates',

    'model/RatingBase',

    'text!view/Rating.html',
], function (
    $,
    tmpl,

    RatingBase,

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
            var games = this.getGamesByFilter(this.currentRatingFilterObject);
            var rating = RatingBase.calculateRating(games);
            this.renderView(rating);
        };

        this.renderView = function (RatingObject) {
            document.body.appendChild(tmpl(RatingView, RatingObject));
        };

        this.getGameRecords = function (З) {
            for (var key in localStorage) {

            }
        };
    };

    return new Rating();
} );
