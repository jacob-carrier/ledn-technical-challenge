import { Router } from "express";

import {AccountService, AccountFilter} from "../services/accounts";
import Pagination from '../utils/pagination';
import Sort from '../utils/sort';

let router = Router()

router.get('/', (req, res) => {
    try{
        let pagination = new Pagination(req.query);
        let sort = new Sort(req.query);
        let filters = new AccountFilter(req.query);
        let accountService = new AccountService(pagination, sort, filters);

        res.json(accountService.getAccounts());
    } catch (e) {
        res.status(400).send({
            "code": 400,
            "error": e
        })
    }
});

export default router;