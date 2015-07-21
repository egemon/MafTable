function Player (nick, birthday) {
    this.nick = nick;
    this.birthday = birthday;
    this.presents = [];
    this.gameHistory = [];

}

Player.prototype.addGameToHistory = function(Game) {
    this.gameHistory.push(Game);
};
