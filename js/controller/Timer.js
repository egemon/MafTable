define(
    'controller/Timer',
[
    'jquery',
    'microtemplates',

    'text!templates/Protocol/Timer.html'
], function (
    $,
    tmpl,

    TimerView
) {
    var Timer = function () {
        $('header').append(tmpl(TimerView, {}));

        this.startBtn = $('#startTimerBtn');
        this.resetBtn = $('#resetTimerBtn');
        this.timeContainer = $('#timerTime');
        this.time = 0;
        this.timeotTime = 60;
        this.interval = null;

        var TimerLink = this;

        this.startBtn.click(function(e) {
            e.preventDefault();
            $(this).toggleClass('start');
            var a = TimerLink.interval ? TimerLink.pause() : TimerLink.start();
        });

        this.resetBtn.click(function (e) {
            e.preventDefault();
            TimerLink.reset();
        });

        this.reset = function () {
            TimerLink.timeContainer.text(TimerLink.time = 0);
            this.pause();
            TimerLink.startBtn.text('Start');
        };

        this.start = function (e) {
            TimerLink.startBtn.text('Pause');

            TimerLink.interval = setInterval(function () {
                    TimerLink.time++;
                    TimerLink.timeContainer.text(TimerLink.time);
                    if (TimerLink.time > TimerLink.timeotTime ) {
                        alert('Times Up!');
                        TimerLink.reset();
                    }
                }, 1000);

        };

        this.pause = function (e) {
            TimerLink.startBtn.text('Start');

            clearInterval(TimerLink.interval);
            TimerLink.interval = null;
        };





    };

    return Timer;
} );
