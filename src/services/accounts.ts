import accounts from "../data/accounts.json";
import Pagination from "../utils/pagination";
import Sort from "../utils/sort";

export class AccountFilter {
    whitelist: Array<string> = ['country', 'mfa', 'firstName', 'lastName'];
    filters?: any

    constructor(query: any) {
        if('filter' in query) {
            let filters = Object.keys(query.filter);
            filters.forEach((element: string) => {
                if (!this.whitelist.includes(element)) {
                    throw `The filter: ${element} cannot be used`;
                }
            });

            this.filters = query.filter;
        }
    }

    public filterItems(listItems: Array<any>) : Array<any>{
        if (this.filters) {
            for (const filter of Object.keys(this.filters)) {
                listItems = listItems.filter((element) => {
                    return this.filters[filter] == element[filter];
                });
            }
        }

        return listItems
    }
}

export class AccountService {
    pagination: Pagination;
    sort?: Sort|null;
    filters?: AccountFilter|null;

    constructor(pagination: Pagination, sort?: Sort|null, filters?: AccountFilter|null) {
        this.pagination = pagination;
        this.sort = sort;
        this.filters = filters
    }

    public getAccounts() {
        var accountList = accounts;

        if (this.filters) {
            accountList = this.filters.filterItems(accountList);
        }

        if (this.sort) {            
            accountList = this.sort.sortItems(accountList);
        }

        let paginated = accountList.slice(this.pagination.start, this.pagination.end);

        return paginated;
    }
}