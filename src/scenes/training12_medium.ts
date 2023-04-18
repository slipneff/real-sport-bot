import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING12_MEDIUM);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING12_MEDIUM}.` });
    await ctx.reply(
        strings.trainings.training12.medium,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_169.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_2.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_3.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_4.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_5.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_169.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_7.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_8.mp4' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train12/1_169.mp4' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING12));

export default scene;
