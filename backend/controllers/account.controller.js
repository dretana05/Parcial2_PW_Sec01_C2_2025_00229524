import { accounts } from '../data/accounts.data.js';

export const getAllAccounts = (req, res) => {
    try {
        const data = accounts;
        const count = data.length;

        res.status(200).json({
            count: count,
            data: data
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getAccountById = (req, res) => {
    try {
        const { id } = req.params;

        const account = accounts.find(acc => acc._id === id);

        if (account) {
            res.status(200).json({
                finded: true,
                account: account
            });
        } else {
            res.status(404).json({
                finded: false,
                account: null
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getAccountsByQuery = (req, res) => {
    try {
        const { _id, client, gender } = req.query;

        let results = [];
        let finded = false;

        if (_id) {
            results = accounts.filter(acc => acc._id === _id);
        } else if (client) {
            results = accounts.filter(acc => acc.client.toLowerCase().includes(client.toLowerCase()));
        } else if (gender) {
            results = accounts.filter(acc => acc.gender.toLowerCase() === gender.toLowerCase());
        } else {
            return res.status(400).json({ finded: false, message: "Parámetro de búsqueda no válido (usar: _id, client, o gender)" });
        }

        finded = results.length > 0;

        if (results.length === 1) {
            res.status(200).json({
                finded: true,
                account: results[0]
            });
        }
        else if (results.length > 1) {
            res.status(200).json({
                finded: true,
                data: results
            });
        }
        else {
            res.status(404).json({
                finded: false,
                message: "No se encontraron cuentas con ese criterio"
            });
        }

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getTotalBalance = (req, res) => {
    try {
        let totalBalance = 0;

        const activeAccounts = accounts.filter(acc => acc.isActive === true);

        if (activeAccounts.length === 0) {
            return res.status(200).json({
                status: false,
                accountBalance: 0
            });
        }

        activeAccounts.forEach(acc => {
            const balanceSinSimbolos = acc.balance.replace('$', '').replace(',', '');
            const balanceNumero = parseFloat(balanceSinSimbolos);

            totalBalance += balanceNumero;
        });

        res.status(200).json({
            status: true,
            accountBalance: totalBalance
        });

    } catch (error) {
        console.error("Error al calcular balance:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};