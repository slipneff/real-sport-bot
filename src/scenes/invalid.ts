import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';
import signale from 'signale';

const scene = new Scene(Scenes.INVALID);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.INVALID}.` });
    await ctx.reply(strings.invalid.greeting, keyboard());
});

export default scene;
