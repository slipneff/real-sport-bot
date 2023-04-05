import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING4_MEDIUM);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING4_MEDIUM}.` });
    await ctx.reply(
        strings.trainings.training4.medium.greeting,
        keyboard([
            [
                { text: strings.menu },

            ],
        ]),
    );
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_1.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_2.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_3.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_4.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_5.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/train4/1_6.gif' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING4));

export default scene;
