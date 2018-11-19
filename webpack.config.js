const path = require('path');

const config = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015', 'react',
                    ],
                },
            }],
        }],
    },
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
