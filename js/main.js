$(function ($) {
	function Model () {
		this.currentGameNumber = 1;
		this.getCurrentGameNumber = function  () {
			return this.currentGameNumber++;
		};

		return this;
	}
	var model = new Model();
});