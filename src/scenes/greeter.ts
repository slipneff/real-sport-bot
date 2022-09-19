import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';

const scene = new Scene(Scenes.GREETER);

scene.enter(async ctx => await ctx.reply(strings.greeter.greeting, keyboard([[{ text: strings.greeter.start }]])));
scene.hears(strings.greeter.start, async ctx => await ctx.scene.enter(Scenes.INITIALS));

export default scene;
