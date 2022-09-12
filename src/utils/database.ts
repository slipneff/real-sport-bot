import fs from 'fs';

// Database is just a json file
export default class FilerWorker {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    readStructure<T>(): T | null {
        try {
            const rawData = fs.readFileSync(this.path).toString();
            const res: T = JSON.parse(rawData) as T;

            return res;
        } catch (error) {
            console.log(`FILE_WORKER | ${error}}`);
            return null;
        }
    }
}
