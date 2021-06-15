import Game from './Game.js'
import Logger from './Logger.js'

let totalGames = 1000000;
const logger = new Logger;

for(let i = 0; i < totalGames; i++){
    logger.logAction(`----- Starte Spiel Nr. ${i + 1} -----`);
    const game = new Game(logger);
    game.start();
}

console.log(logger.toCSV(logger.getFields()));