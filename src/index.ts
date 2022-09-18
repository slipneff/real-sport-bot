import express from 'express';
import bot from './bot';

const app = express();
app.listen(process.env.PORT, () => {
    console.log('Application started on port 3000!');
    bot();
});
