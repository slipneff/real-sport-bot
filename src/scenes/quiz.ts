import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';

const scene = new Scene(Scenes.QUIZ);

scene.enter(async ctx => await ctx.reply(strings.quiz.greeting, keyboard([[{ text: strings.quiz.start }]])));
scene.hears(strings.quiz.start, async ctx => await ctx.scene.enter(Scenes.QUESTION));

export default scene;
