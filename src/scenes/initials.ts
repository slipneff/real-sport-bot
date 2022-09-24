import Scene from 'telegraf/scenes/base';
import { Scenes } from '@utils/constants';
import strings from '@utils/strings';
import keyboard from '@utils/keyboard';
import signale from 'signale';

const validate = (initials: string): boolean =>
    // eslint-disable-next-line
    /([А-ЯЁа-яё]+[\-\s]?){2,}/.test(initials);

const format = (initials: string): string => {
    if (!validate(initials)) return;

    return initials
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map(el => el[0].toUpperCase() + el.slice(1, el.length).toLowerCase())
        .join(' ');
};

// init scene state
const initState = ctx => {
    ctx.session.state = {
        ...ctx.session.state,
        participant: {
            ...ctx.session.state.participant,
            initials: '',
        },
        isHandlingInitials: false,
        isInitialsFilled: false,
    };
};

// reducer works with state and resolve how to change state
const checkInitials = async ctx => {
    if (ctx.chat && ctx.chat.first_name && ctx.chat.last_name) {
        const initials = `${ctx.chat.first_name} ${ctx.chat.last_name}`;
        if (validate(initials)) ctx.session.state.participant.initials ||= format(initials);
    }

    // Initials are already requested, handler is waiting for result
    if (ctx.session.state.isHandlingInitials) return;

    // if initials exist, change flag and request confirmation
    if (ctx.session.state.participant.initials) {
        ctx.session.state.isInitialsFilled = true;

        signale.info({
            prefix: ctx.chat.id,
            message: `REQUEST CONFIRMATION FOR ${ctx.session.state.participant.initials}.`,
        });
        return await ctx.reply(
            strings.initials.confirm(ctx.session.state.participant.initials),
            keyboard([[{ text: strings.initials.yes }, { text: strings.initials.no }]]),
        );
    }

    // if initials don't exist, request them
    return await requestInitials(ctx);
};

// request only changes flag and send request to user
const requestInitials = async ctx => {
    signale.info({ prefix: ctx.chat.id, message: 'REQUEST INITIALS.' });
    ctx.session.state.isHandlingInitials = true;
    ctx.session.state.isInitialsFilled = false;

    return await ctx.reply(strings.initials.request, keyboard());
};

// handler handles data, remove handler flag and pass it to reducer
const handleInitials = async (ctx, next) => {
    await next();

    if (ctx.session.state.isHandlingInitials && ctx.message) {
        if (validate(ctx.message.text)) {
            signale.info({ prefix: ctx.chat.id, message: 'INITIALS ARE VALID.' });
            ctx.session.state.isHandlingInitials = false;
            ctx.session.state.participant.initials = format(ctx.message.text);
            return await checkInitials(ctx);
        }

        signale.info({ prefix: ctx.chat.id, message: 'INITIALS ARE INVALID.' });
        return await ctx.reply(strings.initials.error);
    }
};

// validates data and finish scene
const resolveScene = async ctx => {
    if (
        !ctx.session.state.isHandlingInitials &&
        ctx.session.state.isInitialsFilled &&
        validate(ctx.session.state.participant.initials)
    ) {
        return await ctx.scene.enter(Scenes.PHONE);
    }

    // if state is not valid, reload current scene to drop the state
    return await ctx.scene.enter(Scenes.INITIALS);
};

const scene = new Scene(Scenes.INITIALS);

scene.enter(async ctx => {
    initState(ctx);
    signale.info({ prefix: ctx.chat.id, message: `ENTER ${Scenes.INITIALS}.` });
    return await checkInitials(ctx);
});
scene.hears(strings.initials.no, requestInitials);
scene.hears(strings.initials.yes, resolveScene);

scene.use(handleInitials);

export default scene;
