class Player {
    constructor(logger) {
        this.field = null;
        this.balance = 1500;
        this.totalMoves = 0;
        this.poperties = [];
        this.doubleRolls = 0;
        this.rollsSinceJail = -1;
        this.logger = logger;
    }

    setField = (field) => {
        this.totalMoves++;
        this.field = field;
        this.logger.logField(field);
        this.logger.logAction(`Gehe zum Feld: ${field.name}`);
    }

    getField = () => this.field;

    increaseDoubleRolls = () => this.doubleRolls++;

    getDoubleRolls = () => this.doubleRolls;

    resetDoubleRolls = () => this.doubleRolls = 0;

    getRollsSinceJail = () => this.rollsSinceJail;

    increaseRollsSinceJail = () => this.rollsSinceJail++;

    toJail = (board) => {
        this.setField(board.findFieldByType("jail"));
        this.rollsSinceJail++;
    }

    inJail = () => this.rollsSinceJail !== -1;

    fromJail = () => this.rollsSinceJail = -1;
}

export default Player