import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING11_EASY);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING11_EASY}.` });
    await ctx.reply(
        strings.trainings.training11.easy,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_1.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_2.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_369.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_4.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_5.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_369.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_7.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_8.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train11/1_369.mp4' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING11));

export default scene;
