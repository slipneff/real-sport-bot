import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import Scene from 'telegraf/scenes/base';

const init = ctx => {
    const score = ctx.session.score;

    ctx.reply(strings.quiz.score(score));
};

const results = new Scene(Scenes.RESULTS);
results.enter(init);

export default results;
