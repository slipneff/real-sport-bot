export default {
    sections: [
        {
            message: 'Раздел 1. Логика. Не больше 16 минут.',
            questions: [
                {
                    question: 'Какое женское имя объединяет трех этих персонажей/людей?',
                    attachments: ['images/steve-jobs.jpg', 'images/ben-stiller.jpg', 'images/wall-e.jpg'],
                    answer: 'Ева',
                },
                {
                    question:
                        'Эту задачку могут решить даже дети из первого класса. Задача написать следующую строчку, если известно, что каждая строчка формируется из предыдущей.\n1\n11\n21\n1211\n111221\n312211\n???',
                    answer: '13112221',
                },
                {
                    question: 'Известно, что\nКошка – 3\nКоза – 5\nВорон – 6\nБык – 6\nКролик – 9\nПёс - ?',
                    answer: '6',
                },
                {
                    question:
                        'Поставьте логотипы в правильном порядке так, чтобы из первых букв получилось английское слово, которое есть в слогане одной из этих компаний',
                    attachments: [
                        'images/nikon.png',
                        'images/dell.png',
                        'images/intel.png',
                        'images/samsung.png',
                        'images/ebay.png',
                        'images/ibm.png',
                    ],
                    answer: 'inside',
                },
            ],
        },
        {
            message: 'Раздел 2. Отдых. Не больше 5 минут.',
            questions: [
                {
                    question: 'Напиши слово, которое объединяет эти три Соль – Конь - Голубизна',
                    answer: 'Море',
                },
                {
                    question: 'Напиши слово, которое объединяет эти три Мягкий – Ученый - Борис',
                    answer: 'Кот',
                },
                {
                    question: 'Отгадай название мультика: \uD83C\uDF07\uD83E\uDDB8\u200D♂️\uD83E\uDDB8\u200D♀️',
                    answer: 'Город героев',
                },
            ],
        },
        {
            message: 'Раздел 3. IT. Не больше 5 минут.',
            questions: [
                {
                    question: 'Реши IT-ребус',
                    attachments: ['images/exclamation.png', 'images/bug.png'],
                    answer: 'Фича',
                },
                {
                    question: 'Реши IT-загадку',
                    attachments: ['images/kid.png', 'images/lamp.png', 'images/tomato.png'],
                    answer: 'Мидл',
                },
                {
                    question:
                        'Какой это тип алгоритмической структуры:\nПрограмма спрашивает «Есть чё?», пока не дадут правильный ответ («А чё?»).',
                    answer: 'Цикл',
                },
            ],
        },
    ],
};
