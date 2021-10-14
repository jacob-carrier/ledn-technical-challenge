"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ORDER_BY;
(function (ORDER_BY) {
    ORDER_BY["ASC"] = "asc";
    ORDER_BY["DESC"] = "desc";
})(ORDER_BY || (ORDER_BY = {}));
class Sort {
    constructor(query, sort = 'createdDate') {
        this.order = ORDER_BY.DESC;
        this.sorting_key = 'createdDate';
        if ('sort_by' in query) {
            this.sorting_key = query.sort_by;
        }
        if ('order_by' in query) {
            if (query.order_by == ORDER_BY.ASC) {
                this.order = ORDER_BY.ASC;
            }
        }
    }
    sortItems(listItems) {
        try {
            if (this.order == ORDER_BY.ASC) {
                return listItems.sort((a, b) => a[this.sorting_key] < b[this.sorting_key] ? -1 : 1);
            }
            else {
                return listItems.sort((a, b) => a[this.sorting_key] < b[this.sorting_key] ? 1 : -1);
            }
        }
        catch (e) {
            throw `The key ${this.sorting_key} does not exist to sort on`;
        }
    }
}
exports.default = Sort;
