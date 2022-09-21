export default {
    greeter: {
        greeting:
            'Узнай, умён ли ты настолько, чтобы пройти этот квиз, набирать максимуму баллов, опередить соперников и получить приз.',
        start: 'Узнать',
    },
    initials: {
        yes: 'Да, верно',
        no: 'Нет, изменить',
        request: 'Введи свою фамилию и имя, чтобы мы знали, кто ты',
        error: 'Кажется, вы ввели что-то не то... Попробуйте ещё разок 🙁', // todo: replace string
        confirm: initials => `${initials}. Всё верно?`,
    },
    phone: {
        yes: 'Да, верно',
        no: 'Нет, изменить',
        request: {
            method: 'А ещё нужен твой номер телефона для однозначной идентификации.',
            number: 'Пожалуйста, введите свой номер телефона в формате +7 😇', // todo: replace string
        },
        error: 'Кажется, вы неверно указали номер... Попробуйте ещё разок 🙁', // todo: replace string
        shareContact: 'Отправить мой номер Telegram',
        enterByHand: 'Ввести вручную',
        confirm: phone => `${phone}. Всё верно?`,
    },
    vk: {
        yes: 'Да, верно',
        no: 'Нет, изменить',
        request: 'И ссылка на страницу ВК, чтобы мы точно смогли тебя найти',
        error: 'Кажется, вы ввели что-то не то... Попробуйте ещё разок 🙁', // todo: replace string
        confirm: vk => `${vk}. Всё верно?`,
    },
    quiz: {
        greeting:
            'Готов? Тебе предстоит разобраться с вопросами из трёх разных разделов. Но не думай, что все будет просто, как минимум тебе нужно справиться с паникой, ведь время ограничено. А ещё тебе пригодятся знания русского и не только языка, потому что засчитываются только правильно написанные слова. И будь внимателен - все ответы должны быть написаны маленькими буквами. Инструктаж проведен, теперь ты точно готов!',
        start: 'Готов!',
        outOfTime: 'К сожалению, время на текущий раздел истекло...', // todo: replace string
        score: score =>
            `Молодец. Твой счёт ${score}/20 балов. Благодарим за участие! 😊 \n\n\nАвторы бота: @dr3dnought @x3noku`, // todo: repalce string
    },
    results: {
        greeting:
            'Поздравляем! Ты решился, дошел до конца и это уже успех!\n' +
            'Результаты ты сможешь узнать в конце дня в группе ВК центра обучения "Махаон" или телеграм канале\n' +
            'Чтобы не упустить новость, подпишись на нас ;)',
        vk: 'ВКонтакте: https://vk.com/co_mahaon55',
        telegram: 'Telegram: ',
    },
    invalid: {
        greeting: 'Вы уже принимали участие, второй раз нельзя. Но может попробовать кто-то другой!',
        start: 'Давайте попробует ещё кто-то!',
    },
};
