import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';
import Section from '@models/section';
import Question from '@models/question';
import log from '@utils/log';
import fs from 'fs';
import path from 'path';

// BASE BLOCK

const init = async ctx => {
    const sectionIndex = ctx.session.sectionIndex || 0;
    const questionIndex = ctx.session.questionIndex || 0;

    const section = strings.sections[sectionIndex];
    const question = section.questions[questionIndex];

    if (questionIndex === 0) {
        await ctx.reply(section.message);
    }

    log.debug('Section message completely sent');
    if (question.attachments && question.attachments.length > 0) {
        log.debug('Attachments not null');
        const mediaGroup = question.attachments.map((e, i) => ({
            media: { source: path.join(__dirname, '../', e) },
            type: 'photo',
            caption: i === 0 ? question.question : '',
            bob: (() => {
                log.debug(path.join(__dirname, '../', e));
            })(),
        }));
        return await ctx.replyWithMediaGroup(mediaGroup);
    }

    return await ctx.reply(question.question);
};

const quiz = new Scene(Scenes.QUIZ);
quiz.enter(init);
quiz.on('text', async ctx => {
    if (ctx.message.text === strings.sections[ctx.session.sectionIndex].questions[ctx.session.questionIndex].answer) {
        ctx.session.score += 1;
    }

    ctx.session.questionIndex += 1;
    if (ctx.session.questionIndex >= strings.sections[ctx.session.sectionIndex].questions.length) {
        ctx.session.questionIndex = 0;
        ctx.session.sectionIndex += 1;
    }

    if (ctx.session.sectionIndex >= strings.sections.length) {
        return await ctx.scene.enter(Scenes.RESULTS);
    }

    return await ctx.scene.enter(Scenes.QUIZ);
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
quiz.hears(strings.quiz.start, () => {});

export default quiz;
