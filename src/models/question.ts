export default interface Question {
    order: number;

    question: string;

    attachments: undefined | string | Array<string>;

    answer: string;
}
