enum ORDER_BY {
    ASC = 'asc',
    DESC = 'desc'
}

export default class Sort {
    order: ORDER_BY = ORDER_BY.DESC;
    sorting_key: string = 'createdDate';

    constructor(query: any, sort: string = 'createdDate') {
        if ('sort_by' in query) {
            this.sorting_key = query.sort_by;
        }

        if ('order_by' in query) {
            if (query.order_by == ORDER_BY.ASC) {
                this.order = ORDER_BY.ASC;
            }
        }
    }

    public sortItems(listItems: Array<any>) : Array<any>{
        try {
            if (this.order == ORDER_BY.ASC) {
                return listItems.sort((a, b) => a[this.sorting_key] < b[this.sorting_key] ? -1 : 1);
            } else {
                return listItems.sort((a, b) => a[this.sorting_key] < b[this.sorting_key] ? 1 : -1);
            }
        } catch (e) {
            throw `The key ${this.sorting_key} does not exist to sort on`
        }
    }
}