import { Telegraf } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import greeter from '@scenes/greeter';
import quiz from '@scenes/quiz';
import { Scenes } from '@utils/constants';

const stage = new Stage();
stage.register(greeter, quiz);

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);
bot.use(session());
bot.use(stage.middleware());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
bot.start(ctx => ctx.scene.enter(Scenes.GREETER));

export default () => bot.startPolling();
