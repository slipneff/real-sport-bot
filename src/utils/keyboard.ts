export default (keyboardLayout: any = undefined) => ({
    reply_markup: {
        keyboard: keyboardLayout,
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
    },
});
