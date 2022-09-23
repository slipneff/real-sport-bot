import { Telegraf } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import { Commands, Scenes } from '@utils/constants';
import greeter from '@scenes/greeter';
import initials from '@scenes/initials';
import phone from '@scenes/phone';
import quiz from '@scenes/quiz';
import question from '@scenes/question';
import results from '@scenes/results';
import invalid from '@scenes/invalid';
import vkontakte from '@scenes/vkontakte';
import log from '@utils/log';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';
import database from '@utils/database';

const initState = ctx => {
    ctx.session.state = {
        ...ctx.session.state,
        section: 0,
        question: 0,
        score: 0,
        participant: {
            initials: '',
            phone: '',
            vk: '',
            score: 0,
        },
        timeout: undefined,
        isHandlingPassword: false,
    };
};

const requestPassword = async ctx => {
    ctx.session.state.isHandlingPassword = true;

    return await ctx.reply(strings.excel.requestPassword, keyboard());
};

const handlePassword = async (ctx, next) => {
    await next();

    if (ctx.session && ctx.session.state && ctx.session.state.isHandlingPassword && ctx.message) {
        ctx.session.state.isHandlingPassword = false;

        if (ctx.message.text === process.env.EXCEL_PASSWORD) {
            const db = await database.read();
            const table = database.exportTable(db);
            const buffer = await table.writeToBuffer();

            return await ctx.replyWithDocument({ source: buffer, filename: strings.excel.file });
        }

        return await ctx.reply(strings.excel.wrongPassword);
    }
};

const stage = new Stage();
stage.register(greeter, initials, phone, vkontakte, quiz, question, results, invalid);

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);
bot.use(session());
bot.use(stage.middleware());

bot.catch(err => log.bot.error(`AN ERROR OCCURRED. ${err}`));
bot.start(async ctx => {
    initState(ctx);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await ctx.scene.enter(Scenes.GREETER);
});
bot.command(Commands.RESULTS, requestPassword);
bot.use(handlePassword);

export default () => bot.startPolling();
