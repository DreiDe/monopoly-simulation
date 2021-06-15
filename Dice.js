class Dice{
    constructor(logger){
        this.logger = logger;
    }

    roll = () => {
        const value =  Math.floor(Math.random() * 6) + 1;
        this.logger.logAction(`Würfeln: ${value}`);
        return value;
    }
}

export default Dice