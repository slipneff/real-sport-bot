import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot('5732546256:AAFFus2-Zs5mv4zYA3VxUtpMFUbuMiqh4KI', {
    polling: true,
});

export default () => {
    bot.startPolling();
    console.log('BOT | Bot is polling...');
};
