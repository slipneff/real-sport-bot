import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_MEDIUM_1);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_MEDIUM_1}.` });
    await ctx.reply(strings.trainings.training1.medium.package1, keyboard([[{ text: strings.menu }]]));
    await ctx.replyWithAnimation({ source: __dirname + '/../images/1_1-min.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/1_2-min.gif' });
    await ctx.replyWithAnimation({ source: __dirname + '/../images/1_3-min.gif' });
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING1_MEDIUM));

export default scene;
