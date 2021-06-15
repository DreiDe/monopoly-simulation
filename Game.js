import Player from './Player.js'
import Dice from './Dice.js'
import Board from './Board.js'

class Game {
    constructor(logger) {
        this.rollsPerGame = 100;
        this.startPosition = 1;
        this.logger = logger;
    }

    start = () => {
        // Spielobjekte initialisieren
        const dice = new Dice(this.logger);
        const player = new Player(this.logger);
        const board = new Board(this.logger);

        player.setField(board.findFieldByPosition(this.startPosition));

        // Fixe Anzahl an Würfen pro Spiel
        for(let i = 0; i < this.rollsPerGame; i++){
            // 2x Würfeln
            let roll1 = dice.roll();
            let roll2 = dice.roll();

            if(player.inJail()) player.increaseRollsSinceJail();

            // Pasche hintereinander zählen
            if(roll1 === roll2){
                // Zähler für Pasche erhöhen
                player.increaseDoubleRolls();

                // Bei Pasch aus dem Gefängnis freikommen
                player.fromJail();
            }
            else {
                // Zähler für Pasche hintereinander zurücksetzen
                player.resetDoubleRolls();

                // Nach 3 Fehlwürfen automatisch aus dem Gefängnis freikommen
                if(player.getRollsSinceJail() === 3) player.fromJail();

                // Spieler verbleibt im Gefängnis
                else if(player.inJail()) continue;
            }

            // Spieler bei 3 Paschs hintereinander ins Gefängnis stecken
            if(player.getDoubleRolls() === 3){
                // Zähler für Pasche hintereinander zurücksetzen
                player.resetDoubleRolls();

                // Aktion in den Log schreiben
                this.logger.logAction("Ins Gefängnis wegen 3 Paschs hintereinander");

                player.toJail(board);
                continue;
            }

            // Spieler normal bewegen
            else {
                // Nächstes Feld auf Basis der Augenzahlen berechnen
                // nächste Position = (aktuelle Position + Augenzahl Würfel 1 + Augenzahl Würfel 2) % Gesamtzahl der Felder auf dem Spielbrett
                // wenn die nächste Position Feld 40 ist, ergibt die Formel 0. Da die Felder aber mit Index 1 beginnen, und 0=falsch entspricht
                // wird in diesem Fall die Oder-Bedingung || aufgerufen und als Wert wieder 40 zurückgegeben 
                let nextPosition = (player.getField().position  + roll1 + roll2)%board.getFieldCount() || 40;
                let nextField = board.findFieldByPosition(nextPosition);

                player.setField(nextField);

                // Bei Ereignis- oder Gemeinschaftsfeld Karte ziehen und deren Aktion ausführen
                if(nextField.type === "chest" || nextField.type === "chance"){
                    board.drawCard(nextField.type, player);
                }
                else if(nextField.type === "to_jail") player.toJail(board);
            }
        }
    }
}

export default Game