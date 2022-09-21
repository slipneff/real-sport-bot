import { Telegraf } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import { Scenes } from '@utils/constants';
import greeter from '@scenes/greeter';
import initials from '@scenes/initials';
import phone from '@scenes/phone';
import quiz from '@scenes/quiz';
import question from '@scenes/question';
import results from '@scenes/results';
import invalid from '@scenes/invalid';
import vkontakte from '@scenes/vkontakte';

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
    };
};

const stage = new Stage();
stage.register(greeter, initials, phone, vkontakte, quiz, question, results, invalid);

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);
bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
    initState(ctx);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await ctx.scene.enter(Scenes.GREETER);
});

export default () => bot.startPolling();
