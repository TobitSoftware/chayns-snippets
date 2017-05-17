import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const ROOT_PATH = path.resolve('./');
const SERVER_URL = 'DEV';


export default {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        path.resolve(ROOT_PATH, 'src/index')
    ],
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'app.bundle.js'
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        historyApiFallback: true,
        https: false,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader'
                },{
                    loader: 'webpack-replace',
                    options: {
                        search: '##server_url##',
                        replace: SERVER_URL
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            },
            __DEV__: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject:   true,
            hash: true,
            filename: 'index.html'
        })
    ]
};