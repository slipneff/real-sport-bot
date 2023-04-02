import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.WEEK1);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEK1}.` });
    await ctx.reply(
        strings.weeks.week1.greeting,
        keyboard([
            [
                { text: strings.trainings.training1.name },
                { text: strings.trainings.training2.name },
                { text: strings.trainings.training3.name },
                { text: strings.trainings.training4.name },
                { text: strings.trainings.training5.name },
                { text: strings.menu },
            ],
        ]),
    );
});
scene.hears(strings.trainings.training1.name, async ctx => await ctx.scene.enter(Scenes.TRAINING1));
scene.hears(strings.trainings.training2.name, async ctx => await ctx.scene.enter(Scenes.TRAINING2));
scene.hears(strings.trainings.training3.name, async ctx => await ctx.scene.enter(Scenes.TRAINING3));
scene.hears(strings.trainings.training4.name, async ctx => await ctx.scene.enter(Scenes.TRAINING4));
scene.hears(strings.trainings.training5.name, async ctx => await ctx.scene.enter(Scenes.TRAINING5));
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEKS));

export default scene;
