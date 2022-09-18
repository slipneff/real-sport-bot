import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

// BASE BLOCK

const init = async ctx => {
    ctx.session.initials = '';
    ctx.session.phone = '';
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = false;

    return await ctx.reply(strings.quiz.greeting, keyboard([[{ text: strings.quiz.start }]]));
};

const quiz = new Scene(Scenes.QUIZ);
quiz.enter(init);
// eslint-disable-next-line @typescript-eslint/no-empty-function
quiz.hears(strings.quiz.start, () => {});

export default quiz;
