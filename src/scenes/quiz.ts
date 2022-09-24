import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import database from '@utils/database';
import signale from 'signale';

const scene = new Scene(Scenes.QUIZ);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.QUIZ}.` });
    if (await database.find(ctx.session.state.participant)) return await ctx.scene.enter(Scenes.INVALID);

    await database.update(ctx.session.state.participant);
    signale.success({ prefix: ctx.chat.id, message: 'UPDATE DATABASE USER.' });
    return await ctx.reply(strings.quiz.greeting, keyboard([[{ text: strings.quiz.start }]]));
});
scene.hears(strings.quiz.start, async ctx => await ctx.scene.enter(Scenes.QUESTION));

export default scene;
