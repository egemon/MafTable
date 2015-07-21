$(function ($) {

	function Model () {
		this.currentGameId = 1;
        this.playerNiks = ['Merlin', 'JackPot'];

        this.getCurrentGameNumber = function  () {
			return this.currentGameId++;
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
	var model = new Model();
});