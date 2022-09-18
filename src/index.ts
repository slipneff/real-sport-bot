import express from 'express';
import bot from './bot';
import log from '@utils/log';

const app = express();
app.listen(process.env.PORT, () => {
    log.info(`APPLICATION IS LISTENING ON PORT ${process.env.PORT}`);
    bot();
});
