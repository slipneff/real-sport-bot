import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

const scene = new Scene(Scenes.INVALID);

// todo: add string for invalid state
scene.enter(async ctx => await ctx.reply(strings.invalid.greeting, keyboard([[{ text: strings.invalid.start }]])));
scene.hears(strings.invalid.start, async ctx => {
    await ctx.reply('/start', keyboard());
    await ctx.scene.leave();
});

export default scene;
