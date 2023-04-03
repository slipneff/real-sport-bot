import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING4_EASY);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING4_EASY}.` });
    await ctx.reply(
        strings.trainings.training4.easy.greeting,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNslkKz5ZYCfkWNdLukql7v16BQKuFAAC2ysAAlhgWElLwnj3f3WrDS8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNspkKz5ZQ_vL9kM8MzDLqf9_X6W9IgAC3CsAAlhgWEm5lNuCnjTsvC8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNstkKz5ZgZRPJ4cWvE2NMLUAAefIFg0AAt0rAAJYYFhJd2Z_fQvGn_wvBA');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNsxkKz5ZnRnxghWfENbdlrt3gtD5ZAAC3isAAlhgWEn8XjNZJtHnZC8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNs5kKz5ZHnkjut9rJbCNenZeAtDM3QAC4CsAAlhgWElj6hOCj-prHi8E');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfNs1kKz5Zupc__w3_xSS6U_rBZbF80QAC3ysAAlhgWEm6X2O4lNxM2i8E');
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING4));

export default scene;
