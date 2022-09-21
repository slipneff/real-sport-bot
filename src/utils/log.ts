import { consoleTransport, logger } from 'xenous-logs';
import { Mode } from '@utils/constants';

const config = {
    transport: consoleTransport,
    severity: process.env.NODE_ENV === Mode.DEV ? 'debug' : 'error',
    levels: {
        info: 6,
        error: 3,
        // dev levels
        warn: 2,
        debug: 1,
    },
    transportOptions: {
        // eslint-disable-next-line
        color: `ansi`,
    },
    enabledExtensions: ['bot', 'greeter', 'initials', 'phone', 'vk', 'quiz', 'question', 'result', 'invalid'] as const,
    async: true,
    dateFormat: process.env.NODE_ENV === Mode.DEV ? 'time' : 'utc',
    printLevel: true,
    printDate: true,
    enabled: true,
};

const log = logger.createLogger<typeof config.levels, typeof config.enabledExtensions[number]>(config);

export default log;
