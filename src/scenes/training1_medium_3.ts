import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';
import signale from 'signale';

const scene = new Scene(Scenes.TRAINING1_MEDIUM_3);

scene.enter(async ctx => {
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.TRAINING1_MEDIUM_3}.` });
    await ctx.reply(strings.trainings.training1.medium.package3, keyboard([[{ text: strings.menu }]]));
    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKchkKhD2gRMm0RKMOw2Ggu-uGBf-wAACdCsAAlhgUElCwFDJ1UmMcS8E');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKctkKhEG3VAAAQ-7SVHBd0474zIYEEsAAnUrAAJYYFBJ206TsMuDPssvBA');

    await ctx.replyWithAnimation('CgACAgIAAxkBAAEfKc1kKhEU9CoeuCjET2yR2qvib3xOiwACdisAAlhgUElkSPsBuAzpYS8E');
});
scene.hears(strings.menu, async ctx => await ctx.scene.enter(Scenes.WEEK1));

export default scene;
