"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = exports.AccountFilter = void 0;
const accounts_json_1 = __importDefault(require("../data/accounts.json"));
class AccountFilter {
    constructor(query) {
        this.whitelist = ['country', 'mfa', 'firstName', 'lastName'];
        if ('filter' in query) {
            let filters = Object.keys(query.filter);
            filters.forEach((element) => {
                if (!this.whitelist.includes(element)) {
                    throw `The filter: ${element} cannot be used`;
                }
            });
            this.filters = query.filter;
        }
    }
    filterItems(listItems) {
        if (this.filters) {
            for (const filter of Object.keys(this.filters)) {
                listItems = listItems.filter((element) => {
                    return this.filters[filter] == element[filter];
                });
            }
        }
        return listItems;
    }
}
exports.AccountFilter = AccountFilter;
class AccountService {
    constructor(pagination, sort, filters) {
        this.pagination = pagination;
        this.sort = sort;
        this.filters = filters;
    }
    getAccounts() {
        var accountList = accounts_json_1.default;
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
exports.AccountService = AccountService;
