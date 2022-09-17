import { logger } from 'xenous-logs';

const config = {
    levels: {
        info: 6,
        error: 3,
        warn: 2,
        debug: 1,
    },
    enabledExtensions: ['command'] as const,
};

const logs = logger.createLogger<typeof config.levels, typeof config.enabledExtensions[number]>(config);

export default logs;
