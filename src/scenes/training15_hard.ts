import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING15_HARD);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING15_HARD}.` });
    await ctx.reply(
        strings.trainings.training15.hard,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_1.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_2.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_369.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_4.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_5.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_369.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_7.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_8.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train15/1_369.mp4' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING15));

export default scene;
