import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING10);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEK1}.` });
    await ctx.reply(
        strings.weeks.week1,
        keyboard([
            [
                { text: strings.trainings.training1 },
                { text: strings.trainings.training2 },
                { text: strings.trainings.training3 },
                { text: strings.trainings.training4 },
                { text: strings.trainings.training5 },
            ],
        ]),
    );
});
scene.hears(strings.weeks.week1, async ctx => await ctx.scene.enter(Scenes.WEEK1));
scene.hears(strings.weeks.week2, async ctx => await ctx.scene.enter(Scenes.WEEK2));
scene.hears(strings.weeks.week3, async ctx => await ctx.scene.enter(Scenes.WEEK3));

export default scene;
