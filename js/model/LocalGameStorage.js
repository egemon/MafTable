define(
    'model/LocalGameStorage',
[
    'model/GameRecord',
], function (
    GameRecord
) {
    console.log('[LocalGameStorage] init started with arg = ', arguments);
    var LocalGameStorage = function () {

        //prefix for localStorage objects
        this.appIdentifier = 'MT';

        this.saveGame = function (GameRecord) {
            var id = this.generateGameId(GameRecord.metadata);
            localStorage.setItem(id, JSON.stringify(GameRecord));
        };

        // this.loadGame = function (gameId) {
        //     View.StartPage.loadGame(this.games[gameId]);
        // };


        // filterObject = {
        //     gameId: "MT_2015-09-21_1_Baker Street",
        //     periodType: "month" || "year" || "season",
        //     period: "1" || "2015" || "4",
        //     playerNick: "Merlin"
        // }
        this.getGamesByFilter = function (filterObject) {

            var resultGames = null;
            if (!filterObject || !Object.keys(filterObject).length) {
                return this.getAllGames();
            }

            for (var key in filterObject) {
                switch(key) {
                    case "gameId":
                    return [JSON.parse(localStorage.getItem(filterObject.gameId))];

                    case "periodType":

                        //if there is no period break
                        if (!filterObject.period) {
                            console.warn('[M-LocalGameStorage] getGamesByFilter(): no period or periodType');
                            return;
                        }

                        resultGames = this.getGamesByPeriod(filterObject.periodType, filterObject.period);

                    break;
                    case "playerNick":
                        resultGames = resultGames ?
                            this.filterGamesByNick(resultGames, filterObject.playerNick) :
                            this.getGamesByNick(filterObject.playerNick);
                    break;
                    case "period":
                    //prevent console warn
                    break;
                    default:
                        console.warn('[M-LocalGameStorage] getGamesByFilter(): Wrong filterObject!');
                }
            }

            return resultGames;
        };


        //returns array of objects
        this.getGamesByPeriod = function (periodType, period) {
            console.log('[M-LocalGameStorage] getGamesByPeriod(): ', arguments);
            var resultGamesArray = [];
            for (var i = 0; i < localStorage.length; i++) {
                var currentId = localStorage.key(i);
                var currentPeriod;
                switch(periodType) {
                    case 'month':
                        currentPeriod = +currentId.split('_')[1].split('-')[1];
                    break;
                    //winter is 1, autunmn is 4
                    case 'season':
                        currentPeriod = parseInt((+currentId.split('_')[1].split('-')[1] % 12) / 3) + 1;
                    break;
                    case 'year':
                        currentPeriod = +currentId.split('_')[1].split('-')[0];
                    break;
                }
                if (currentPeriod == period) {
                    resultGamesArray.push(JSON.parse(localStorage.getItem(currentId)));
                }
            }
            return resultGamesArray;
        };

        this.filterGamesByNick = function (resultGames, playerNick) {
            console.log('[M-LocalGameStorage] filterGamesByNick(): ', arguments);
            var filteredResult = [];
            for (var i = 0; i < resultGames.length; i++) {
                for (var j = 0; j < resultGames[i].playerLines.length; j++) {
                    if (resultGames[i].playerLines[j].name == playerNick) {
                        filteredResult.push(resultGames[i]);
                    }
                }
            }
            return filteredResult;
        };

        this.getGamesByNick = function (playerNick) {
            console.log('[M-LocalGameStorage] getGamesByNick(): ', arguments);
            return this.filterGamesByNick(this.getAllGames(), playerNick);
        };

        this.getAllGames = function () {
            var resultGamesArray = [];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.split('_')[0] === this.appIdentifier) {
                    resultGamesArray.push(JSON.parse(localStorage.getItem(key)));
                }
            }
            return resultGamesArray;
        };



        this.resetGameStorage = function () {
            localStorage.clear();
        };

        this.generateGameId = function (metadata) {
            return [this.appIdentifier, metadata.date, metadata.gameNumber, metadata.tableName].join('_');
        };


    };

    var singelton = singelton || new LocalGameStorage();
    return singelton;
} );
