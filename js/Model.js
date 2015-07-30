define(
    'Model',
[
    'model/Player'
], function (
    Player
) {
    console.log('Player = ', Player);
    console.log('args', arguments);
    function Model () {
        this.currentGameId = 1;
        this.playerNiks = ['Merlin', 'JackPot'];
        this.players = [];

        this.getCurrentGameNumber = function  () {
            return this.currentGameId++;
        };

        this.startGame = function  () {
            var self = this;
            this.playerNiks.forEach(function (val, i, arr) {
                this.players.push(new Player(val));
            }, this);
            console.log('this.players', this.players);
        };

        this.saveGame = function  () {
            localStorage.setItem('game ' + this.getCurrentGameNumber, JSON.stringify(this.createGameJson()));
        };

        this.createGameJson = function  () {
            return {
                // here we get all parametrs from model
            };
        };
        return this;
    }

    return new Model();

} );
