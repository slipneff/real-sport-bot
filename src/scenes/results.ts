import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import Scene from 'telegraf/scenes/base';

const init = async ctx => await ctx.reply(strings.quiz.score(ctx.session.state.participant.score));

const scene = new Scene(Scenes.RESULTS);
scene.enter(init);

export default scene;
