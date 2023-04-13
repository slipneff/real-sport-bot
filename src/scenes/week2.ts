import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.WEEK2);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEK2}.` });
    await ctx.reply(
        strings.weeks.week2.greeting,
        keyboard([
            [
                { text: strings.trainings.training6.name },
                { text: strings.trainings.training7.name },
                { text: strings.trainings.training8.name },
                // { text: strings.trainings.training9.name },
                // { text: strings.trainings.training10.name },
                { text: strings.menu },
            ],
        ]),
    );
});
scene.hears(strings.trainings.training6.name, async ctx => await ctx.scene.enter(Scenes.TRAINING6));
scene.hears(strings.trainings.training7.name, async ctx => await ctx.scene.enter(Scenes.TRAINING7));
scene.hears(strings.trainings.training8.name, async ctx => await ctx.scene.enter(Scenes.TRAINING8));
scene.hears(strings.trainings.training9.name, async ctx => await ctx.scene.enter(Scenes.TRAINING9));
scene.hears(strings.trainings.training10.name, async ctx => await ctx.scene.enter(Scenes.TRAINING10));
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEKS));

export default scene;
