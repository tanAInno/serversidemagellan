var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '192.168.27.199';
const PORT = process.env.PORT || 5050;

const METADATA = Object.assign({}, {
    host: HOST,
    port: PORT,
    PUBLIC: process.env.PUBLIC_DEV || HOST + ':' + PORT
});

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },{
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },{
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
            },{
                test: /\.woff/, 
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },{
                test: /\.woff2/, 
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },{
                test: /\.eot/, 
                loader: 'file-loader'
            },{
                test: /\.ttf/, 
                loader: 'file-loader'
            },{
                test: /\.svg/, 
                loader: 'file-loader'
            },{
                test: /\.gif$/, 
                loader: "url-loader?mimetype=image/png"
            },{
                test: /\\.(gif|ttf|eot|svg|woff2?)$/,
                use: 'url-loader?name=[name].[ext]',
            }
        ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        inline: false,
        contentBase: parentDir,
        historyApiFallback: true,
        port: METADATA.port,
        host: METADATA.host,
        public: METADATA.PUBLIC,
    }
}