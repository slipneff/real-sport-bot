import { consoleTransport, logger } from 'xenous-logs';

const config = {
    transport: consoleTransport,
    severity: 'debug',
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
    enabledExtensions: ['command'] as const,
    async: true,
    dateFormat: 'time',
    printLevel: true,
    printDate: true,
    enabled: true,
};

const log = logger.createLogger<typeof config.levels, typeof config.enabledExtensions[number]>(config);

export default log;
