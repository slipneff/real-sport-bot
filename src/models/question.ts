export default interface Question {
    question: string;

    attachments: undefined | string | Array<string>;

    answer: string;
}
