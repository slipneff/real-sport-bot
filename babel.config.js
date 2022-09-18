// eslint-disable-next-line no-undef
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['@babel/preset-env'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@handlers': './src/handlers',
                        '@images': './src/images',
                        '@models': './src/models',
                        '@raw': './src/raw',
                        '@utils': './src/utils',
                    },
                },
            ],
        ],
    };
};
