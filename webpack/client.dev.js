const pathConfig = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const hotMiddlewareScript =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=1500&reload=true';

module.exports = {
    name: 'client',
    target: 'web',
    entry: [hotMiddlewareScript, `${pathConfig.srcDir}/client.jsx`],
    output: {
        path: pathConfig.outputDir,
        filename: 'client.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules\/)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.pcss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: `${__dirname}/../postcss/postcss.config.js`
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
            disable: true
        })
    ]
};
