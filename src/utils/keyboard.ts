export default keyboardLayout => ({
    reply_markup: {
        keyboard: keyboardLayout,
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
    },
});
