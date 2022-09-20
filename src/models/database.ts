import Participant from '@models/participant';

export default interface Database {
    participants: Array<Participant>;
}
