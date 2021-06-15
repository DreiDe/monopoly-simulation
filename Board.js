import Cards from './Cards.js'

class Board {
    constructor(logger) {
        this.logger = logger;

        this.fields = [
            { position: 1, name: "Los", type: "go" },
            { position: 2, name: "Badstraße", type: "property" },
            { position: 3, name: "Gemeinschaftsfeld", type: "chest" },
            { position: 4, name: "Turmstraße", type: "property" },
            { position: 5, name: "Einkommensteuer", type: "tax" },
            { position: 6, name: "Südbahnhof", type: "station" },
            { position: 7, name: "Chausseestraße", type: "property" },
            { position: 8, name: "Ereignisfeld", type: "chance" },
            { position: 9, name: "Elisenstraße", type: "property" },
            { position: 10, name: "Poststraße", type: "property" },
            { position: 11, name: "Im Gefängnis / Nur zu Besuch", type: "jail" },
            { position: 12, name: "Seestraße", type: "property" },
            { position: 13, name: "Elektrizitätswerk", type: "utility" },
            { position: 14, name: "Hafenstraße", type: "property" },
            { position: 15, name: "Neue Straße", type: "property" },
            { position: 16, name: "Westbahnhof", type: "station" },
            { position: 17, name: "Münchner Straße", type: "property" },
            { position: 18, name: "Gemeinschaftsfeld", type: "chest" },
            { position: 19, name: "Wiener Straße", type: "property" },
            { position: 20, name: "Berliner Straße", type: "property" },
            { position: 21, name: "Frei Parken", type: "parking" },
            { position: 22, name: "Theaterstraße", type: "property" },
            { position: 23, name: "Ereignisfeld", type: "chance" },
            { position: 24, name: "Museumstraße", type: "property" },
            { position: 25, name: "Opernplatz", type: "property" },
            { position: 26, name: "Nordbahnhof", type: "property" },
            { position: 27, name: "Lessingstraße", type: "property" },
            { position: 28, name: "Schillerstraße", type: "property" },
            { position: 29, name: "Wasserwerk", type: "utility" },
            { position: 30, name: "Goethestraße", type: "property" },
            { position: 31, name: "Gehen Sie in das Gefängnis", type: "to_jail" },
            { position: 32, name: "Rathausplatz", type: "property" },
            { position: 33, name: "Hauptstraße", type: "property" },
            { position: 34, name: "Gemeinschaftsfeld", type: "chest" },
            { position: 35, name: "Bahnhofstraße", type: "property" },
            { position: 36, name: "Hauptbahnhof", type: "station" },
            { position: 37, name: "Ereignisfeld", type: "chance" },
            { position: 38, name: "Parkstraße", type: "property" },
            { position: 39, name: "Zusatzsteuer", type: "tax" },
            { position: 40, name: "Schlossallee", type: "property" },
        ];

        this.chestCards = [
            {
                text: "Rücke vor bis zum nächsten Verkehrsfeld. Der Eigentümer erhält das Doppelte der normalen Miete. Hat noch kein Spieler einen Besitzanspruch auf dieses Feld, so kannst du es von der Bank kaufen.",
                action: (player) => {
                    player.setField(this.findFieldByType("station", player.field.position));
                }
            },
            { text: "Du kommst aus dem Gefängnis frei. Diese Karte musst Du behalten bis Du sie benötigst oder verkaufst." },
            {
                text: "Gehe in das Gefängnis begib dich direkt dorthin. Gehe nicht über Los. Ziehe nicht 200€ ein.",
                action: (player) => {
                    player.toJail(this);
                }
            },
            { text: "Arzt-Kosten. Zahle 50€." },
            { text: "Du hast den 2. Preis in einer Schönheitskonkurrenz gewonnen. Ziehe 10€ ein." },
            {
                text: "Gehe zurück zur Badstraße.",
                action: (player) => {
                    player.setField(this.findFieldByName("Badstraße"));
                }
            },
            { text: "Zahle an das Krankenhaus 100€." },
            { text: "Es ist dein Geburtstag. Ziehe von jedem Spieler 10€ ein." },
            { text: "Bank-Irrtum zu deinen Gunsten. Ziehe 200€ ein." },
            { text: "Zahle eine Strafe von 10€ oder nimm eine Ereigniskarte." },
            { text: "Du erbst 100€." },
            {
                text: "Rücke vor bis auf Los",
                action: (player) => {
                    player.setField(this.findFieldByName("Los"));
                }
            },
            { text: "Du erhältst auf Vorzugs-Aktien 7% Dividende. 25€" },
            { text: "Aus Lagerverkäufen erhältst Du 50€." },
            { text: "Einkommensteuer-Rückzahlung. Ziehe 20€ ein." },
            { text: "Die Jahresrente wird fällig. Ziehe 100€ ein." }
        ];

        this.chanceCards = [
            { text: "Zahle Schulgeld 150€." },
            { text: "Du bist zum Vorstand gewählt worden. Zahle jedem Spieler 50€." },
            {
                text: "Gehe in das Gefängnis begib dich direkt dorthin. Gehe nicht über Los. Ziehe nicht 200€ ein.",
                action: (player) => {
                    player.toJail(this);
                }
            },
            { text: "Du wirst zu Straßenausbesserungsarbeiten herangezogen. Zahle für deine Häuser und Hotels 40€ je Haus, 115€ je Hotel an die Bank." },
            { text: "Lasse alle deine Häuser renovieren! Zahle an die Bank: Für jedes Haus 25€, Für jedes Hotel 100€" },
            {
                text: "Rücke vor bis zur Seestraße. Wenn du über Los kommst, ziehe 200€ ein.",
                action: (player) => {
                    player.setField(this.findFieldByName("Seestraße"));
                }
            },
            {
                text: "Mache eine Ausflug zum Südbahnhof. Wenn du über Los kommst, ziehe 200€ ein.",
                action: (player) => {
                    player.setField(this.findFieldByName("Südbahnhof"));
                }
            },
            {
                text: "Rücke vor bis zur Schlossallee.",
                action: (player) => {
                    player.setField(this.findFieldByName("Schlossallee"));
                }
            },
            { text: "Miete und Anleihezinsen werden fällig. Die Bank zahlt dir 150€." },
            {
                text: "Rücke vor bis auf Los.",
                action: (player) => {
                    player.setField(this.findFieldByName("Los"));
                }
            },
            {
                text: "Gehe 3 Felder zurück.",
                action: (player) => {
                    player.setField(this.findFieldByPosition(
                        player.getField().position <= 3
                            ? this.getFieldCount() + player.getField().position - 3
                            : player.getField().position - 3
                    ));
                    if(player.getField() === "chest" || player.getField() === "chance"){
                        this.drawCard(player.getField().type, player);
                    }
                }
            },
            { text: "Du kommst aus dem Gefängnis frei. Diese Karte musst Du behalten bis Du sie benötigst oder verkaufst." },
            {
                text: "Rücke vor bis zum Opernplatz. Wenn du über Los kommst, ziehe 200€ ein.",
                action: (player) => {
                    player.setField(this.findFieldByName("Opernplatz"));
                }
            },
            { text: "Strafe für zu schnelles Fahren: 15€" },
            { text: "Du hast in einem Kreuzworträtsel Wettbewerb gewonnen. Ziehe 100€ ein." },
            { text: "Die Bank zahlt Dir eine Dividende: 50€" }
        ]

        this.chest = new Cards(this.logger);
        this.chance = new Cards(this.logger);

        this.chest.setCards(this.chestCards);
        this.chance.setCards(this.chanceCards);

        this.logger.logAction("Ereigniskarten neu mischen");
        this.logger.logAction("Gemeinschaftskarten neu mischen");
    }

    getFieldCount = () => this.fields.length;

    findFieldByPosition = (position) => this.fields.find(e => e.position === position);

    findFieldByName = (name) => this.fields.find(e => e.name === name);

    findFieldByType = (type, offset = 0) => {
        let match = this.fields.find(e => e.type === type && e.position > offset);
        if (!match) match = this.fields.find(e => e.type === type);
        return match;
    }

    drawCard = (type, player) => {
        if (type === "chance") {
            this.logger.logAction('Ziehe Ereigniskarte:');
            this.chance.draw(player);
        }
        else if (type === "chest") {
            this.logger.logAction('Ziehe Gemeinschaftskarte:');
            this.chest.draw(player);
        }
    }
}

export default Board