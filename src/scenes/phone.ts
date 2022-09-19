import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

const validate = (phone: string): boolean =>
    // eslint-disable-next-line
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(phone);

const format = (phone: string): string => {
    if (!validate(phone)) return;

    phone = phone.replace(/\D/g, '');

    return (
        `+7(${phone.slice(1, 3 + 1)})` +
        `${phone.slice(3 + 1, 6 + 1)}-` +
        `${phone.slice(6 + 1, 8 + 1)}-` +
        `${phone.slice(8 + 1, 10 + 1)}`
    );
};

// init scene state
const initState = ctx => {
    ctx.session.state = {
        ...ctx.session.state,
        phone: '',
        isHandlingPhone: false,
        isHandlingContact: false,
        isPhoneFilled: false,
    };
};

// reducer works with state and resolve how to change state
const checkPhone = async ctx => {
    // Phone or contact are already requested, handler is waiting for result
    if (ctx.session.state.isHandlingPhone || ctx.session.state.isHandlingContact) return;

    // if phone exists, change flag and request confirmation
    if (ctx.session.state.phone) {
        ctx.session.state.isPhoneFilled = true;

        return await ctx.reply(
            strings.phone.confirm(ctx.session.state.phone),
            keyboard([[{ text: strings.phone.yes }, { text: strings.phone.no }]]),
        );
    }

    // if phone doesn't exist, request phone enter method
    return await requestPhoneEnterMethod(ctx);
};

// request only changes flags and send request to user
const requestPhoneEnterMethod = async ctx => {
    ctx.session.state.isHandlingPhone = false;
    ctx.session.state.isHandlingContact = true;

    return await ctx.reply(
        strings.phone.request.method,
        keyboard([
            [{ text: strings.phone.shareContact, request_contact: true }],
            [{ text: strings.phone.enterByHand }],
        ]),
    );
};

// request only changes flags and send request to user
const requestPhone = async ctx => {
    ctx.session.state.isHandlingPhone = true;
    ctx.session.state.isHandlingContact = true;

    return await ctx.reply(strings.phone.request.number);
};

// handler handles data, remove handler flag and pass it to reducer
const handlePhone = async (ctx, next) => {
    await next();

    if (ctx.session.state.isHandlingPhone && ctx.message) {
        if (validate(ctx.message.text)) {
            ctx.session.state.isHandlingPhone = false;
            ctx.session.state.isHandlingContact = false;
            ctx.session.state.phone = format(ctx.message.text);
            return await checkPhone(ctx);
        }

        return await ctx.reply(strings.phone.error);
    }
};

// handler handles data, remove handler flag and pass it to reducer
const handleContact = async (ctx, next) => {
    await next();

    if (ctx.session.state.isHandlingContact && ctx.message && ctx.message.contact) {
        if (validate(ctx.message.contact.phone_number)) {
            ctx.session.state.isHandlingPhone = false;
            ctx.session.state.isHandlingContact = false;
            ctx.session.state.phone = format(ctx.message.contact.phone_number);
            return await checkPhone(ctx);
        }

        return await ctx.reply(strings.phone.error);
    }
};

// validates data and finish scene
const resolveScene = async ctx => {
    if (
        !ctx.session.state.isHandlingPhone &&
        !ctx.session.state.isHandlingContact &&
        ctx.session.state.isPhoneFilled &&
        validate(ctx.session.state.phone)
    ) {
        return await ctx.scene.enter(Scenes.QUIZ);
    }

    // if state is not valid, reload current scene to drop the state
    return await ctx.scene.enter(Scenes.PHONE);
};

const scene = new Scene(Scenes.PHONE);

scene.enter(async ctx => {
    initState(ctx);
    return await checkPhone(ctx);
});
scene.hears(strings.phone.enterByHand, requestPhone);
scene.hears(strings.phone.no, requestPhoneEnterMethod);
scene.hears(strings.phone.yes, resolveScene);

scene.use(handlePhone, handleContact);

export default scene;
