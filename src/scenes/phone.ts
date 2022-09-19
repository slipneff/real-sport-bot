import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

const validate = (phone: string): boolean => phone && true;

// init scene state
const initState = async ctx => {
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
        // todo: validate data and handle entities
        ctx.session.state.isHandlingPhone = false;
        ctx.session.state.isHandlingContact = false;
        ctx.session.state.phone = ctx.message.text;
        return await checkPhone(ctx);
    }
};

// handler handles data, remove handler flag and pass it to reducer
const handleContact = async (ctx, next) => {
    await next();

    if (ctx.session.state.isHandlingContact && ctx.message && ctx.message.contact) {
        // todo: validate data and handle entities
        ctx.session.state.isHandlingPhone = false;
        ctx.session.state.isHandlingContact = false;
        ctx.session.state.phone = ctx.message.contact.phone_number;
        return await checkPhone(ctx);
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

const phone = new Scene(Scenes.PHONE);

phone.enter(async ctx => {
    await initState(ctx);
    await checkPhone(ctx);
});
phone.hears(strings.phone.enterByHand, requestPhone);
phone.hears(strings.phone.no, requestPhoneEnterMethod);
phone.hears(strings.phone.yes, resolveScene);

phone.use(handlePhone, handleContact);

export default phone;
