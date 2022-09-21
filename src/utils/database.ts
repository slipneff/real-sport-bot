import fs from 'fs';
import excel from 'excel4node';
import Database from '@models/database';
import Participant from '@models/participant';
import strings from '@utils/strings';

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

const exportTable = (db: Database) => {
    const wb = new excel.Workbook();
    const ws = wb.addWorksheet(strings.excel.worksheet);

    const fontStyle = wb.createStyle({ font: { size: 13 } });

    strings.excel.columns.forEach((column, columnIndex) => {
        ws.cell(1, columnIndex + 1)
            .string(column)
            .style(fontStyle);
    });

    db.participants.forEach((participant, rowIndex) => {
        ws.cell(rowIndex + 2, 1)
            .number(rowIndex + 1)
            .style(fontStyle);
        ws.cell(rowIndex + 2, 2)
            .string(participant.initials)
            .style(fontStyle);
        ws.cell(rowIndex + 2, 3)
            .string(participant.phone)
            .style(fontStyle);
        ws.cell(rowIndex + 2, 4)
            .link(participant.vk)
            .style(fontStyle);
        ws.cell(rowIndex + 2, 5)
            .number(participant.score)
            .style(fontStyle);
    });

    return wb;
};

export default {
    read,
    find,
    update,
    exportTable,
};
