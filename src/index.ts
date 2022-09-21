import express from 'express';
import bot from './bot';
import log from '@utils/log';

const app = express();
app.listen(process.env.PORT, () => {
    log.info(`LISTENING ON PORT ${process.env.PORT}.`);
    log.info(`WORKING IN ${process.env.NODE_ENV} MODE.`);
    bot();
});
