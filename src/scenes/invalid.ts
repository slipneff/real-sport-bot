import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

const scene = new Scene(Scenes.INVALID);

// todo: add string for invalid state
scene.enter(async ctx => await ctx.reply(strings.invalid.greeting, keyboard()));

export default scene;
