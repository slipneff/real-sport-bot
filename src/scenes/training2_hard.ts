import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING2_HARD);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING2_HARD}.` });
    await ctx.reply(
        strings.trainings.training2.hard.greeting,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.GREETER));

export default scene;