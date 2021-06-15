class Logger {
    constructor(){
        this.fields = [];
        this.actions = [];
    }

    logField = (field) => {
        let index = this.fields.findIndex(e => e.position === field.position);
        if(index !== -1){
            this.fields[index].visitCount += 1;
        }
        else{
            this.fields.push({...field, visitCount: 1})
        }
    }

    logAction = (action) => {
        /*let keepStored = 1000;

        if(this.actions.length === keepStored) this.actions.shift();

        this.actions.push(action);*/
    }

    toCSV = (data) => {
        let table = null;
        const seperator = ";";

        for(const row of data){
            if(table === null){
                table = Object.keys(row).join(seperator) + '\n';
            }
            table += Object.values(row).join(seperator) + '\n';
        }

        return table;
    }

    getFields = () => this.fields.sort((a,b) => (a.visitCount > b.visitCount) ? 1 : ((b.visitCount > a.visitCount) ? -1 : 0));

    getActions = () => this.actions;
}

export default Logger