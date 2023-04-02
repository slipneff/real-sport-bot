import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_MEDIUM_2);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_MEDIUM_2}.` });
    await ctx.reply(strings.trainings.training1.medium.package2, keyboard([[{ text: strings.menu }]]));
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKcBkKhCjN127GxcIShZcDGGDxZjGsAACcCsAAlhgUEmOSV3ch6jd1i8E');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKcJkKhCwXDGaeK_LpDUN_atKrhURdAACcSsAAlhgUEkbRCrw6xbtOi8E');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKcRkKhC-X1W0MxY3an0xq5-0DxnkggACcisAAlhgUEk-qgVD_yEAARovBA');
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKcZkKhDb8YfoMTZC9esH8hmOzYzw2gACcysAAlhgUEnZFHpzewfm9i8E');
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING1_MEDIUM));

export default scene;
