import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING3_1);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING3_1}.` });
    await ctx.reply(
        strings.trainings.training3.easy.package1,
        keyboard([
            [
                { text: strings.menu },
            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train3/1_1.MP4' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING3));

// scene.hears(strings.weeks.week1, async ctx => await ctx.scene.enter(Scenes.WEEK1));
// scene.hears(strings.weeks.week2, async ctx => await ctx.scene.enter(Scenes.WEEK2));
// scene.hears(strings.weeks.week3, async ctx => await ctx.scene.enter(Scenes.WEEK3));

export default scene;
