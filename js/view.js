$(function  ($) {
	function MainPage () {
		this.navBar = $('.nav-pills');
        this.saveButton = $('#saveButton');
		this.pullButton = $('#pullButton');
        this.pushButton = $('#pushButton');

        this.winField = $('#winField');
        this.refereeField = $('#refereeField');

        this.playerNameFields = $('.playerNameField');
        this.playerRoleFields = $('.playerRoleField');
        this.playerfallFields = $('.playerfallField');

        this.endButton = $('#endButton');
		this.init = function  () {
			var self = this;
            console.log(this.saveButton);
            console.log(this.pullButton);
            console.log(this.pushButton);
            console.log(this.winField);
            console.log(this.refereeField);
            console.log(this.playerNameFields);
            console.log(this.playerRoleFields);
            console.log(this.playerfallFields);

            // general functions 

            // binding events



			this.saveButton.click(function(e) {
				e.preventDefault();
                Model.saveGame();
				
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