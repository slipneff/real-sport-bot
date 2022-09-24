import express from 'express';
import bot from './bot';
import signale from 'signale';

const app = express();
app.listen(process.env.PORT, () => {
    signale.info(`LISTENING ON PORT ${process.env.PORT}.`);
    signale.info(`WORKING IN ${process.env.NODE_ENV} MODE.`);
    bot();
});
