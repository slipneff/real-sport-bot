import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.WEEK2);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEK2}.` });
    await ctx.reply(
        strings.weeks.week1,
        keyboard([
            [
                { text: strings.trainings.training6 },
                { text: strings.trainings.training7 },
                { text: strings.trainings.training8 },
                { text: strings.trainings.training9 },
                { text: strings.trainings.training10 },
            ],
        ]),
    );
});
scene.hears(strings.weeks.week1, async ctx => await ctx.scene.enter(Scenes.WEEK1));
scene.hears(strings.weeks.week2, async ctx => await ctx.scene.enter(Scenes.WEEK2));
scene.hears(strings.weeks.week3, async ctx => await ctx.scene.enter(Scenes.WEEK3));

export default scene;
