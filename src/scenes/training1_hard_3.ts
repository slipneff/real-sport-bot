import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_HARD_3);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_HARD_3}.` });
    await ctx.reply(strings.trainings.training1.hard.package3, keyboard([[{ text: strings.menu }]]));
    await ctx.replyWithAnimation({ source: __dirname + '/../images/3_1-min.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/3_2-min.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/3_3-min.gif' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEK1));

export default scene;
