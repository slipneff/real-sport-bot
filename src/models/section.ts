import Question from '@models/question';

export default interface Section {
    message: string;

    questions: Array<Question>;
}
