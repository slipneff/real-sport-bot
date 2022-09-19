import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import path from 'path';
import quiz from '@utils/quiz';
import keyboard from '@utils/keyboard';

const format = (data: string): string => {
    return data
        .replace(/[^А-ЯЁа-яёa-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
};

const init = async ctx => {
    const section = quiz.sections[ctx.session.state.section];
    const question = section.questions[ctx.session.state.question];

    if (!ctx.session.state.question) {
        await ctx.reply(section.message, keyboard());
    }

    if (question.attachments && question.attachments.length > 0) {
        const media = question.attachments.map((source, index) => ({
            media: { source: path.join(__dirname, '../', source) },
            caption: index === 0 ? question.question : '',
            type: 'photo',
        }));

        return await ctx.replyWithMediaGroup(media, keyboard());
    }

    return await ctx.reply(question.question, keyboard());
};

const scene = new Scene(Scenes.QUESTION);

scene.enter(init);

scene.on('text', async ctx => {
    // compare answers
    if (
        format(ctx.message.text) ===
        format(quiz.sections[ctx.session.state.section].questions[ctx.session.state.question].answer)
    ) {
        ctx.session.state.score += 1;
    }

    // increment counters and update them if needed
    if (++ctx.session.state.question >= quiz.sections[ctx.session.state.section].questions.length) {
        ctx.session.state.question = 0;
        ctx.session.state.section += 1;
    }

    // if we are out of sections, go to result scene
    if (ctx.session.state.section >= quiz.sections.length) {
        return await ctx.scene.enter(Scenes.RESULTS);
    }

    // if we still have what ot show, reenter current scene
    return await ctx.scene.enter(Scenes.QUESTION);
});

export default scene;
