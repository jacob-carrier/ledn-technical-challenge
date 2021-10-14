export default class Pagination {
    page: number = 1;
    limit: number = 10;

    constructor(query: any) {
        if (('page' in query)) {
            this.page = parseInt(query.page);
        }

        if (('limit' in query)) {
            this.limit = parseInt(query.limit);
        }
    }

    public get start() {
        return Math.max(0, (this.page - 1)) * this.limit;
    }

    public get end() {
        return this.start + this.limit;
    }
}