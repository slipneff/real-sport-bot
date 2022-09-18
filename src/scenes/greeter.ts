import Scene from 'telegraf/scenes/base';
import keyboard from '@utils/keyboard';
import strings from '@utils/strings';
import { Scenes } from '@utils/constants';

// BASE BLOCK

const init = async ctx => {
    ctx.session.initials = '';
    ctx.session.phone = '';
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = false;

    return await ctx.reply(strings.greeter.greeting, keyboard([[{ text: strings.greeter.start }]]));
};

const finish = async ctx => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await ctx.scene.enter(Scenes.QUIZ);
};

// INITIALS BLOCK

const checkInitials = async ctx => {
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = false;

    if (ctx.chat && ctx.chat.first_name && ctx.chat.last_name) {
        ctx.session.initials ||= `${ctx.chat.first_name} ${ctx.chat.last_name}`;
    }

    if (ctx.session.initials) {
        return await ctx.reply(
            strings.initials.confirm(ctx.session.initials),
            keyboard([[{ text: strings.initials.yes }, { text: strings.initials.no }]]),
        );
    }

    return await enterInitials(ctx);
};

const enterInitials = async ctx => {
    ctx.session.isWaitingForInitials = true;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = false;

    return await ctx.reply(strings.initials.request);
};

const handleInitials = async (ctx, next) => {
    await next();

    if (ctx.session.isWaitingForInitials && ctx.message) {
        // todo: validate data
        ctx.session.initials = ctx.message.text;
        ctx.session.isWaitingForInitials = false;
        ctx.session.isWaitingForPhone = false;
        ctx.session.isWaitingForContact = false;
        return await checkInitials(ctx);
    }
};

// PHONE BLOCK

const checkPhone = async ctx => {
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = false;

    if (ctx.session.phone) {
        return await ctx.reply(
            strings.phone.confirm(ctx.session.phone),
            keyboard([[{ text: strings.phone.yes }, { text: strings.phone.no }]]),
        );
    }

    return await requestPhoneEnterMethod(ctx);
};

const requestPhoneEnterMethod = async ctx => {
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = false;
    ctx.session.isWaitingForContact = true;

    return await ctx.reply(
        strings.phone.request.method,
        keyboard([
            [{ text: strings.phone.shareContact, request_contact: true }],
            [{ text: strings.phone.enterByHand }],
        ]),
    );
};

const enterPhone = async ctx => {
    ctx.session.isWaitingForInitials = false;
    ctx.session.isWaitingForPhone = true;
    ctx.session.isWaitingForContact = false;

    return await ctx.reply(strings.phone.request.number);
};

const handlePhone = async (ctx, next) => {
    await next();

    if (ctx.session.isWaitingForPhone && ctx.message) {
        // todo: validate data and handle entities
        ctx.session.isWaitingForPhone = false;
        ctx.session.isWaitingForContact = false;
        ctx.session.phone = ctx.message.text;

        return await checkPhone(ctx);
    }
};

const handleContact = async (ctx, next) => {
    await next();

    if (ctx.session.isWaitingForContact && ctx.message && ctx.message.contact) {
        // todo: validate data and handle entities
        ctx.session.isWaitingForInitials = false;
        ctx.session.isWaitingForPhone = false;
        ctx.session.isWaitingForContact = false;
        ctx.session.phone = ctx.message.contact.phone_number;

        return await checkPhone(ctx);
    }
};

const greeter = new Scene(Scenes.GREETER);

greeter.enter(init);
greeter.hears(strings.greeter.start, checkInitials);

greeter.hears(strings.initials.no, enterInitials);
greeter.hears(strings.initials.yes, checkPhone);

greeter.hears(strings.phone.enterByHand, enterPhone);
greeter.hears(strings.phone.no, requestPhoneEnterMethod);
greeter.hears(strings.phone.yes, finish);

greeter.use(handleInitials, handlePhone, handleContact);

export default greeter;
