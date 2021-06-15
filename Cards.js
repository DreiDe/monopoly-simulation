class Cards {
    constructor(logger) {

        this.cards = null;
        this.logger = logger;
        this.cursor = 0;
    }   
    
    draw = (player) => {
        if(this.cursor === this.cards.length - 1) this.cursor = 0;

        let card = this.cards[this.cursor];
        this.logger.logAction(card.text);
        if(card.action) card.action(player);

        this.cursor++;
    }

    setCards = (cards) => {
        this.cards = cards;
        this.shuffle();
    }

    shuffle = () => {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

export default Cards