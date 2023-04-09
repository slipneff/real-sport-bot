import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING6_EASY);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING6_EASY}.` });
    await ctx.reply(
        strings.trainings.training6.medium,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_1.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_2.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_3.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_4.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_5.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train6/1_6.mp4' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING6));

export default scene;
