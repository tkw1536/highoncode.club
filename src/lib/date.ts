const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

export default class DateDate {
    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    
    readonly year: number;
    readonly month: number;
    readonly day: number;

    static parse(value: string): DateDate {
        const matched = value.match(DATE_REGEX);
        if (!matched) throw new Error("Unable to parse date: Must be of shape YYYY-MM-DD");

        const year = parseInt(matched[1], 10);
        const month = parseInt(matched[2], 10);
        const day = parseInt(matched[3], 10);

        return new DateDate(year, month, day);
    }

    toString(): string {
        return `${MONTH_NAMES[this.month - 1]} ${this.day}, ${this.year}`;
    }

    toISOString(): string {
        return `${this.year.toString().padStart(4, '0')}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
    }
}