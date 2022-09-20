import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';

const scene = new Scene(Scenes.RESULTS);
scene.enter(async ctx => {
    await ctx.reply(strings.results.greeting, keyboard());
    await ctx.reply(strings.results.vk, keyboard());
    await ctx.reply(strings.results.telegram, keyboard());
});

export default scene;
