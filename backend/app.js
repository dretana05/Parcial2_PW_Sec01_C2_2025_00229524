import express from 'express';
import cors from 'cors';

import accountsRouter from './routes/accounts.routes.js';
import accountRouter from './routes/account.routes.js';

const app = express();
const PORT = 3130;

app.use(express.json());
app.use(cors());

app.use('/cuentas', accountsRouter);

app.use('/cuenta', accountRouter);

app.get('/', (req, res) => {
    res.send('Servidor de Diego Retana');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});