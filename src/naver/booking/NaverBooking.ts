class NaverBooking {
    private readonly _title: string;
    private readonly _date: string;
    private readonly _info: string;

    constructor(title: string, date: string, info: string) {
        this._title = title;
        this._date = date;
        this._info = info;
    }

    get info(): string {
        return this._info;
    }
    get date(): string {
        return this._date;
    }
    get title(): string {
        return this._title;
    }
}
