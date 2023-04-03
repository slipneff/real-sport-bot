import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING2_MEDIUM);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING2_MEDIUM}.` });
    await ctx.reply(
        strings.trainings.training2.medium.greeting,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNrpkKz1bIJSSZbLsmvk3P_4bv_GZXAAC2isAAlhgWEk46VkIbZiW-C8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNpVkKzuSuf-bZLO1bTWR1OTy2Hv5PAACzCsAAlhgWElxWrxcdOAV5S8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNpZkKzuSvHG9TdE3k7S8fCXaHAzW2AACzisAAlhgWEk4LTP4qruQCy8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNpdkKzuSA2k22CMsavwfYshi-kE5vwACzysAAlhgWEl4CD2Pj06-mS8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNphkKzuS5z1CcoVqKTT0FSi2oDZ51QAC0CsAAlhgWElIW3QjLYRCzC8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNplkKzuSor4hVSocl36yAh0SsRnq3QAC0SsAAlhgWEm5__bAon7oxy8E');
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING2));

export default scene;
