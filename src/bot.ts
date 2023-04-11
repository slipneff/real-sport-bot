import { Telegraf } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import { Commands, Scenes } from '@utils/constants';
import greeter from '@scenes/greeter';
import signale from 'signale';
import weeks from '@scenes/weeks';
import week1 from '@scenes/week1';
import week3 from '@scenes/week3';
import week2 from '@scenes/week2';
import training1 from '@scenes/training1';
import training2 from '@scenes/training2';
import training3 from '@scenes/training3';
import training4 from '@scenes/training4';
import training14 from '@scenes/training14';
import training5 from '@scenes/training5';
import training6 from '@scenes/training6';
import training7 from '@scenes/training7';
import training8 from '@scenes/training8';
import training9 from '@scenes/training9';
import training10 from '@scenes/training10';
import training11 from '@scenes/training11';
import training12 from '@scenes/training12';
import training13 from '@scenes/training13';
import training15 from '@scenes/training15';
import training1_easy from '@scenes/training1_easy';
import training1_medium from '@scenes/training1_medium';
import training1_hard from '@scenes/training1_hard';
import training4_hard from '@scenes/training4_hard';
import training4_medium from '@scenes/training4_medium';
import training4_easy from '@scenes/training4_easy';
import training2_hard from '@scenes/training2_hard';
import training2_medium from '@scenes/training2_medium';
import training2_easy from '@scenes/training2_easy';
import training1_hard_3 from '@scenes/training1_hard_3';
import training1_hard_2 from '@scenes/training1_hard_2';
import training1_hard_1 from '@scenes/training1_hard_1';
import training1_medium_3 from '@scenes/training1_medium_3';
import training1_medium_2 from '@scenes/training1_medium_2';
import training1_medium_1 from '@scenes/training1_medium_1';
import training1_easy_3 from '@scenes/training1_easy_3';
import training1_easy_2 from '@scenes/training1_easy_2';
import training1_easy_1 from '@scenes/training1_easy_1';
import training3_3 from '@scenes/training3_3';
import training3_2 from '@scenes/training3_2';
import training3_1 from '@scenes/training3_1';
import training6_easy from '@scenes/training6_easy';
import training6_medium from '@scenes/training6_medium';
import training6_hard from '@scenes/training6_hard';
import training7_hard from '@scenes/training7_hard';
import training7_easy from '@scenes/training7_easy';
import training7_medium from '@scenes/training7_medium';

const initState = ctx => {
    ctx.session.state = {
        ...ctx.session.state,
        timeout: undefined,
    };
};

const stage = new Stage();
stage.register(
    greeter,
    weeks,
    week1,
    week2,
    week3,
    training1,
    training1_easy,
    training1_medium,
    training1_hard,
    training1_easy_1,
    training1_easy_2,
    training1_easy_3,
    training1_medium_1,
    training1_medium_2,
    training1_medium_3,
    training1_hard_1,
    training1_hard_2,
    training1_hard_3,
    training2,
    training2_easy,
    training2_medium,
    training2_hard,
    training3,
    training3_1,
    training3_2,
    training3_3,
    training4,
    training4_easy,
    training4_medium,
    training4_hard,
    training5,
    training6,
    training6_easy,
    training6_medium,
    training6_hard,
    training7,
    training7_easy,
    training7_medium,
    training7_hard,
    training8,
    training9,
    training10,
    training11,
    training12,
    training13,
    training14,
    training15,
);

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);
bot.use(session());
bot.use(stage.middleware());

bot.catch((err, ctx) => signale.error({ prefix: ctx.chat.id, message: err }));
bot.start(async ctx => {
    initState(ctx);
    signale.success({ prefix: ctx.chat.id, message: 'BOT SUCCESSFULLY STARTED.' });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await ctx.scene.enter(Scenes.GREETER);
});


export default () => bot.startPolling();
