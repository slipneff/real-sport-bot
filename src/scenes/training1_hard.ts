import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_HARD);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_HARD}.` });
    await ctx.reply(strings.trainings.training1.hard.greeting, keyboard([[{ text: strings.package.package1 },{ text: strings.package.package2 },{ text: strings.package.package3 },{ text: strings.menu }]]));
});
scene.hears(strings.package.package1, async ctx => await ctx.scene.enter(Scenes.TRAINING1_HARD_1));
scene.hears(strings.package.package2, async ctx => await ctx.scene.enter(Scenes.TRAINING1_HARD_2));
scene.hears(strings.package.package3, async ctx => await ctx.scene.enter(Scenes.TRAINING1_HARD_3));
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING1));
export default scene;
