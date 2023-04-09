import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.WEEKS);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.WEEKS}.` });
    await ctx.reply(
        strings.weeks.greeting,
        keyboard([
            [
                { text: strings.weeks.week1.name },
                { text: strings.weeks.week2.name },
                //{ text: strings.weeks.week3.name },
            ],
        ]),
    );
});
scene.hears(strings.weeks.week1.name, async ctx => await ctx.scene.enter(Scenes.WEEK1));
scene.hears(strings.weeks.week2.name, async ctx => await ctx.scene.enter(Scenes.WEEK2));
//scene.hears(strings.weeks.week3.name, async ctx => await ctx.scene.enter(Scenes.WEEK3));

export default scene;
