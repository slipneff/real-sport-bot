import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING4);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING4}.` });
    await ctx.reply(
        strings.trainings.training4.greeting,
        keyboard([
            [{ text: strings.complexity.easy }, { text: strings.complexity.medium }, { text: strings.complexity.hard }],
        ]),
    );
});
scene.hears(strings.complexity.easy, async ctx => await ctx.scene.enter(Scenes.TRAINING4_EASY));
scene.hears(strings.complexity.medium, async ctx => await ctx.scene.enter(Scenes.TRAINING4_MEDIUM));
scene.hears(strings.complexity.hard, async ctx => await ctx.scene.enter(Scenes.TRAINING4_HARD));

export default scene;
