import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING9);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING9}.` });
    await ctx.reply(
        strings.trainings.training9.greeting,
        keyboard([
            [
                { text: strings.complexity.easy },
                { text: strings.complexity.medium },
                { text: strings.complexity.hard },
                { text: strings.menu },

            ],
        ]),
    );
});
scene.hears(strings.complexity.easy, async ctx => await ctx.scene.enter(Scenes.TRAINING9_EASY));
scene.hears(strings.complexity.medium, async ctx => await ctx.scene.enter(Scenes.TRAINING9_MEDIUM));
scene.hears(strings.complexity.hard, async ctx => await ctx.scene.enter(Scenes.TRAINING9_HARD));
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEK2));

export default scene;
