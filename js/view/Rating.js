define(
    'view/Rating',
[
    'jquery',
    'microtemplates',
    'helper',

    'text!templates/Rating/RatingData.html',
    'text!templates/Rating/RatingFilters.html',
    'text!templates/Rating/monthFilterSelect.html',
    'text!templates/Rating/seasonFilterSelect.html',
    'text!templates/Rating/yearFilterSelect.html',

    'controller/Protocol'
], function (
//utils
    $,
    tmpl,
    helper,

// templates
    RatingDataView,
    RatingFiltersView,
    month,
    season,
    year
) {
    var RatingView = function () {
        var RatingV = this;
        var RatingC = {};
        this.init = function (RatingController) {
            this.month = month;
            this.season = season;
            this.year = year;
            RatingC = RatingController;

            $('header').html(tmpl(RatingFiltersView, RatingC.currentRatingFilterObject));
            this.hangEventHeandlers();
            return this.showCurrentRating();
        };

        this.showCurrentRating = function () {
            return RatingV.renderRatingTable(RatingC.getRatingArray(RatingV.getFilterObject()));
        };

        this.renderRatingTable = function (ratingArray) {
            if (ratingArray.length) {
                $('.form-horizontal').html((tmpl(RatingDataView, ratingArray)));
                return true;
            } else {
                console.warn('!!!!!no rating results');
                alert('No games availiable for rating canculation!');
                return false;
            }
        };

        this.getFilterObject = function () {
            return {
                periodType: $('#periodType').val(),
                period: $('#period').val()
            };
        };

        this.hangEventHeandlers = function () {
            $('#newGameButton').click(function(e) {
                // TODO fix Protocol
                helper.clearPage();
                RatingC.initProtocol();
            });

            $('#periodType').change(function(e) {
                var periodType = $(this).val();
                var currentSelectView = RatingV[periodType];
                $('#period').html(tmpl(currentSelectView, {}));
            });

            $('#period').change(function (e) {
                if (!RatingV.showCurrentRating()) {
                    $(this).val($(this).data('oldVal'));
                }
            });

            $('#period').focus(function (e) {
                $(this).data('oldVal', $(this).val());
            });
        };
    };

    return new RatingView();
} );
