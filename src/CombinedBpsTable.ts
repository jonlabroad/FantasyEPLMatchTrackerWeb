export default class CombinedBpsTable {
    private home : any = null;
    private away : any = null;

    public table : Array<any> = new Array<any>();

    constructor(away : any, home : any) {
        this.home = home;
        this.away = away;

        this.combine();
    }

    protected combine() {
        this.table = this.home.concat(this.away);
        this.sort();
    }

    protected sort() {
        this.table.sort(function(bps1, bps2) : number {
            return bps2.value - bps1.value;
        });
    }

}