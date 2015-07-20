function Player (nick, birthday) {
    this.nick = nick;
    this.birthday = birthday;
    this.gameHistory = [];

}

Player.prototype.addGame = function(Game) {
    this.gameHistory.push(Game);
};