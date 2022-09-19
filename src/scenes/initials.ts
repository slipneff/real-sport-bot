import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';

const validate = (initials: string): boolean => initials && true;

// init scene state
const initState = async ctx => {
    ctx.session.state = {
        ...ctx.session.state,
        initials: '',
        isHandlingInitials: false,
        isInitialsFilled: false,
    };
};

// reducer works with state and resolve how to change state
const checkInitials = async ctx => {
    if (ctx.chat && ctx.chat.first_name && ctx.chat.last_name) {
        ctx.session.state.initials ||= `${ctx.chat.first_name} ${ctx.chat.last_name}`;
    }

    // Initials are already requested, handler is waiting for result
    if (ctx.session.state.isHandlingInitials) return;

    // if initials exist, change flag and request confirmation
    if (ctx.session.state.initials) {
        ctx.session.state.isInitialsFilled = true;

        return await ctx.reply(
            strings.initials.confirm(ctx.session.state.initials),
            keyboard([[{ text: strings.initials.yes }, { text: strings.initials.no }]]),
        );
    }

    // if initials don't exist, request them
    return await requestInitials(ctx);
};

// request only changes flag and send request to user
const requestInitials = async ctx => {
    ctx.session.state.isHandlingInitials = true;

    return await ctx.reply(strings.initials.request, keyboard());
};

// handler handles data, remove handler flag and pass it to reducer
const handleInitials = async (ctx, next) => {
    await next();

    if (ctx.session.state.isHandlingInitials && ctx.message) {
        // todo: validate data
        ctx.session.state.isHandlingInitials = false;
        ctx.session.state.initials = ctx.message.text;
        return await checkInitials(ctx);
    }
};

// validates data and finish scene
const resolveScene = async ctx => {
    if (
        !ctx.session.state.isHandlingInitials &&
        ctx.session.state.isInitialsFilled &&
        validate(ctx.session.state.initials)
    ) {
        return await ctx.scene.enter(Scenes.PHONE);
    }

    // if state is not valid, reload current scene to drop the state
    return await ctx.scene.enter(Scenes.INITIALS);
};

const initials = new Scene(Scenes.INITIALS);

initials.enter(async ctx => {
    await initState(ctx);
    await checkInitials(ctx);
});
initials.hears(strings.initials.no, requestInitials);
initials.hears(strings.initials.yes, resolveScene);

initials.use(handleInitials);

export default initials;
