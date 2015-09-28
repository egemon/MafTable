
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
    'text!view/Rating/monthFilterSelect.html',
    'text!view/Rating/seasonFilterSelect.html',
    'text!view/Rating/yearFilterSelect.html',
], function (
    $,
    tmpl,

    RatingBase,
    LocalGameStorage,

    Protocol,

    RatingDataView,
    RatingFiltersView,

    month,
    season,
    year
) {
    var Rating = function () {
        console.log('[C > Rating] init');
        var RatingLink = this;
        var ProtocolLink = Protocol;
        this.month = month;
        this.season = season;
        this.year = year;

        //previos month (numeration from 0)
        this.currentRatingFilterObject = {
            periodType: "month",
            period: (new Date()).getMonth() + 1
        };

        this.init = function () {
            $('header').html(tmpl(RatingFiltersView, this.currentRatingFilterObject));
            this.hangEventHeandlers();
            return this.showRating();
        };

        this.showRating = function (RatingFilterObject) {
            var games = LocalGameStorage.getGamesByFilter(RatingFilterObject || this.currentRatingFilterObject);
            var ratingArray = RatingBase.calculateRating(games);
            if (ratingArray.length) {
                $('.form-horizontal').html((tmpl(RatingDataView, ratingArray)));
                return true;
            } else {
                console.warn('!!!!!no rating results');
                alert('No games availiable for rating canculation!');
                return false;
            }
        };

        this.recalculateRatingWithFilters = function () {
            return this.showRating({
                periodType: $('#periodType').val(),
                period: $('#period').val()
            });
        };

        this.hangEventHeandlers = function () {
            $('#newGameButton').click(function(e) {
                // TODO fix Protocol 
                window.location.reload();
            });

            $('#periodType').change(function(e) {
                var periodType = $(this).val();
                var currentSelectView = RatingLink[periodType];
                $('#period').html(tmpl(currentSelectView, {}));
            });

            $('#period').change(function (e) {
                if (!RatingLink.recalculateRatingWithFilters()) {
                    $(this).val($(this).data('oldVal'));
                }
            });

            $('#period').focus(function (e) {
                $(this).data('oldVal', $(this).val());
            });
        };
    };

    return new Rating();
} );
