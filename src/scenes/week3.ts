import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.WEEK3);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEK3}.` });
    await ctx.reply(
        strings.weeks.week3.greeting,
        keyboard([
            [
                { text: strings.trainings.training11.name },
                { text: strings.trainings.training12.name },
                { text: strings.trainings.training13.name },
                { text: strings.trainings.training14.name },
                { text: strings.trainings.training15.name },
                { text: strings.menu },
            ],
        ]),
    );
});
scene.hears(strings.trainings.training11.name, async ctx => await ctx.scene.enter(Scenes.TRAINING11));
scene.hears(strings.trainings.training12.name, async ctx => await ctx.scene.enter(Scenes.TRAINING12));
scene.hears(strings.trainings.training13.name, async ctx => await ctx.scene.enter(Scenes.TRAINING13));
scene.hears(strings.trainings.training14.name, async ctx => await ctx.scene.enter(Scenes.TRAINING14));
scene.hears(strings.trainings.training15.name, async ctx => await ctx.scene.enter(Scenes.TRAINING15));
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEKS));

export default scene;
