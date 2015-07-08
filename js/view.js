$(function  ($) {
	function MainPage () {
		this.navBar = $('.nav-pills');
		this.navLinks = this.navBar.find('a');
		this.endButton = $('#endButton');
		this.pullButton = $('#pullButton');
		this.init = function  () {
			var self = this;
			this.endButton.click(function(e) {
				e.preventDefault();
				localStorage.setItem('game ' + 1, JSON.stringify(self.createGameJson()));
			});
			this.pullButton.click(function(e) {
				e.preventDefault();
				self.currentGame = localStorage.getItem('game ' + 1);
				console.log(self.currentGame);
			});
		};

		this.initPlayers = function  () {
			var players = [];
			for (var i = 1; i <= 10; i++) {
				var currentContainer = $('#player'+i+'Info');
				players.push({
					"name": currentContainer.find('#player' + i + 'name').text(),
					'role': currentContainer.find('#player' + i + 'role').val(),
				});
			}
			return players;
		};

		this.initInfo = function () {
			return {
				win: $('#win').val(),
				ref: $('#ref').text()
			};
		};

		this.createGameJson = function  () {
			return {
				"players" : this.initPlayers(),
				"info" : this.initInfo(),
			};
		};

		this.init();
	};

	var MP = new MainPage();
	console.log(MP);
});