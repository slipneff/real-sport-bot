import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_MEDIUM_1);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_MEDIUM_1}.` });
    await ctx.reply(strings.trainings.training1.medium.package1, keyboard([[{ text: strings.menu }]]));
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKbpkKg7U6NfhNOb9aLEYRPU_ux87_wACZisAAlhgUEm57opFE_fBmi8E');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKbxkKhBOk88JOPi1bQy7AmXfO5mryAACbisAAlhgUElJRkIAAfBVDoQvBA');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKb5kKhBcpcaUf4OEi3HiLcifXBBZbgACbysAAlhgUEkjPzp3al7tLC8E');
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.TRAINING1_MEDIUM));

export default scene;
