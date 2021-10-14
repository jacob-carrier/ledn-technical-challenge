"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../services/accounts");
const pagination_1 = __importDefault(require("../utils/pagination"));
const sort_1 = __importDefault(require("../utils/sort"));
let router = (0, express_1.Router)();
router.get('/', (req, res) => {
    try {
        let pagination = new pagination_1.default(req.query);
        let sort = new sort_1.default(req.query);
        let filters = new accounts_1.AccountFilter(req.query);
        let accountService = new accounts_1.AccountService(pagination, sort, filters);
        res.json(accountService.getAccounts());
    }
    catch (e) {
        res.status(400).send({
            "code": 400,
            "error": e
        });
    }
});
exports.default = router;
