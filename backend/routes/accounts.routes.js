import { Router } from 'express';
import {
    getAllAccounts,
    getAccountsByQuery,
    getTotalBalance
} from '../controllers/account.controller.js';

const router = Router();

router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return getAllAccounts(req, res);
    } else {
        return getAccountsByQuery(req, res);
    }
});

router.get('/balance', getTotalBalance);

export default router;