
define(
    'controller/Rating',
[
    'jquery',
    'microtemplates',

    'model/RatingBase',
    'model/LocalGameStorage',

    'controller/Protocol',

    'text!view/Rating/RatingData.html',
    'text!view/Rating/RatingFilters.html',
], function (
    $,
    tmpl,

    RatingBase,
    LocalGameStorage,

    Protocol,

    RatingDataView,
    RatingFiltersView
) {
    var Rating = function () {
        console.log('[C > Rating] init');

        //previos month (numeration from 0)
        this.currentRatingFilterObject = {
            periodType: "month",
            period: (new Date()).getMonth() + 1
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

        this.hangEventHeandlersOnButtons = function () {
            $('#showRatingBtn').click(function(e) {
                window.location.reload();
            });
        };

        this.renderView = function (ratingArray) {
            $('header').html(tmpl(RatingFiltersView, this.currentRatingFilterObject));
            $('.form-horizontal').html((tmpl(RatingDataView, ratingArray)));
            this.hangEventHeandlersOnButtons();
        };


        this.getGameRecords = function (З) {
            for (var key in localStorage) {

            }
        };
    };

    return new Rating();
} );
