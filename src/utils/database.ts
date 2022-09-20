import fs from 'fs';
import Database from '@models/database';
import Participant from '@models/participant';

const path = process.env.DB_PATH;

const read = async (flag = false): Promise<Database> => {
    try {
        return JSON.parse((await fs.promises.readFile(path)).toString()) as Database;
    } catch (e) {
        if (flag) throw e;

        await write({ participants: [] });
        return await read(true);
    }
};

const write = async (db: Database): Promise<void> => await fs.promises.writeFile(path, JSON.stringify(db));

const find = async (participant: Participant): Promise<boolean> => {
    const database = await read();
    return database.participants.findIndex(element => element.phone === participant.phone) !== -1;
};

const update = async (participant: Participant): Promise<void> => {
    const db = await read();
    const isParticipantExists = await find(participant);

    return await write({
        ...db,
        participants: [
            ...db.participants.filter(element => !isParticipantExists || element.phone !== participant.phone),
            participant,
        ],
    });
};

export default {
    find,
    update,
};
