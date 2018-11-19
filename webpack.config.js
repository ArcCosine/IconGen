const path = require('path');

const config = {
    mode: 'development',
    devServer: {
        inline: true,
        open: true,
        openPage: 'index.html',
        contentBase: path.resolve(__dirname, 'docs'),
        watchContentBase: true,
        port: 3000
    }
};

module.exports = config;
