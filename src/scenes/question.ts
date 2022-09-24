import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import path from 'path';
import quiz from '@utils/quiz';
import keyboard from '@utils/keyboard';
import database from '@utils/database';
import strings from '@utils/strings';
import signale from 'signale';

const format = (data: string): string => {
    return data
        .replace(/[^А-ЯЁа-яёa-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
};

const init = async ctx => {
    signale.info({
        prefix: ctx.chat.id,
        message: `ENTER ${Scenes.QUIZ}. SECTION: ${ctx.session.state.section}. QUESTION: ${ctx.session.state.question}`,
    });
    // if we are out of sections, go to result scene
    if (ctx.session.state.section >= quiz.sections.length) {
        if (ctx.session.state.timeout) clearTimeout(ctx.session.state.timeout);

        return await ctx.scene.enter(Scenes.RESULTS);
    }

    const section = quiz.sections[ctx.session.state.section];
    const question = section.questions[ctx.session.state.question];

    // we've entered new section
    if (!ctx.session.state.question) {
        await ctx.reply(section.message, keyboard([[{ text: strings.question.dontKnow }]]));

        // start timeout
        if (ctx.session.state.timeout) clearTimeout(ctx.session.state.timeout);
        ctx.session.state.timeout = setTimeout(async () => {
            signale.info({ prefix: ctx.chat.id, message: 'TIME IS OUT.' });
            await ctx.reply(strings.quiz.outOfTime, keyboard([[{ text: strings.question.dontKnow }]]));

            ctx.session.state.section += 1;
            ctx.session.state.question = 0;

            return await ctx.scene.enter(Scenes.QUESTION);
        }, section.time);
    }

    if (question.attachments && question.attachments.length > 0) {
        const media = question.attachments.map((source, index) => ({
            media: { source: path.join(process.env.PWD, 'src/images', source) },
            caption: index === 0 ? question.question : '',
            type: 'photo',
        }));

        return await ctx.replyWithMediaGroup(media);
    }

    return await ctx.reply(question.question, keyboard([[{ text: strings.question.dontKnow }]]));
};

const scene = new Scene(Scenes.QUESTION);

scene.enter(init);

scene.on('text', async ctx => {
    // compare answers
    const answers = quiz.sections[ctx.session.state.section].questions[ctx.session.state.question].answer;

    if ((Array.isArray(answers) ? answers : [answers]).some(answer => format(ctx.message.text) === format(answer))) {
        signale.info({ prefix: ctx.chat.id, message: 'ANSWERS MATCH.' });
        ctx.session.state.participant.score += 1;
        await database.update(ctx.session.state.participant);
        signale.success({ prefix: ctx.chat.id, message: 'UPDATE DATABASE SCORE.' });
    } else signale.info({ prefix: ctx.chat.id, message: 'ANSWERS DON`T MATCH.' });

    // increment counters and update them if needed
    if (++ctx.session.state.question >= quiz.sections[ctx.session.state.section].questions.length) {
        ctx.session.state.section += 1;
        ctx.session.state.question = 0;
    }

    // if we still have what ot show, reenter current scene
    return await ctx.scene.enter(Scenes.QUESTION);
});

export default scene;
