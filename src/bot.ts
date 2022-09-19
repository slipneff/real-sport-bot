import { Telegraf } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import greeter from '@scenes/greeter';
import quiz from '@scenes/quiz';
import { Scenes } from '@utils/constants';
import initials from '@scenes/initials';
import phone from '@scenes/phone';
import results from '@scenes/results';

const init = ctx => {
    ctx.session.sectionIndex = 0;
    ctx.session.questionIndex = 0;
    ctx.session.score = 0;

    ctx.scene.enter(Scenes.GREETER);
};

const stage = new Stage();
stage.register(greeter, initials, phone, quiz, results);

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);
bot.use(session());
bot.use(stage.middleware());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
bot.start(init);

export default () => bot.startPolling();
