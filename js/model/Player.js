define(
    'model/Player',
    ['model/PlayerBase'],
    function (PlayerBase) {
        console.log('[model/Player] >> Player module initialized');
        function Player (nick, birthday) {
            console.log('[model/Player] >> Player constructor');
            this.id = PlayerBase.generateId();
            this.nick = nick;
            this.gameHistory = []; // [Game, Game, ...]
            this.birthday = birthday;

            this.presents = [];
            this.phone = phone;
            this.vk = vk;
            this.comfortableTime = comfortableTime;
            PlayerBase.addPlayer(this);
        }

        Player.prototype.addGameToHistory = function(Game) {
            this.gameHistory.push(Game);
        };

        return Player;
    }
);