import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_EASY);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_EASY}.` });
    await ctx.reply(strings.trainings.training1.easy.greeting);
    await ctx.reply(strings.trainings.training1.easy.package1);
    await ctx.reply(strings.trainings.training1.easy.package2);
    await ctx.reply(strings.trainings.training1.easy.package3, keyboard([[{ text: strings.menu }]]));
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.GREETER));

export default scene;
