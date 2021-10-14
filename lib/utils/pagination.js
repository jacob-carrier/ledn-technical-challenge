"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(query) {
        this.page = 1;
        this.limit = 10;
        if (('page' in query)) {
            this.page = parseInt(query.page);
        }
        if (('limit' in query)) {
            this.limit = parseInt(query.limit);
        }
    }
    get start() {
        return Math.max(0, (this.page - 1)) * this.limit;
    }
    get end() {
        return this.start + this.limit;
    }
}
exports.default = Pagination;
