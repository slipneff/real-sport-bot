import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING3);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING3}.` });
    await ctx.reply(
        strings.trainings.training3.greeting,
        keyboard([
            [

                { text: strings.package.package1},
                { text: strings.package.package2},
                { text: strings.package.package3},
                { text: strings.menu },
            ],
        ]),
    );
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEK1));
scene.hears(strings.package.package1, async ctx => await ctx.scene.enter(Scenes.TRAINING3_1));
scene.hears(strings.package.package2, async ctx => await ctx.scene.enter(Scenes.TRAINING3_2));
scene.hears(strings.package.package3, async ctx => await ctx.scene.enter(Scenes.TRAINING3_3));

// scene.hears(strings.weeks.week1, async ctx => await ctx.scene.enter(Scenes.WEEK1));
// scene.hears(strings.weeks.week2, async ctx => await ctx.scene.enter(Scenes.WEEK2));
// scene.hears(strings.weeks.week3, async ctx => await ctx.scene.enter(Scenes.WEEK3));

export default scene;
