const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pathConfig = require('./paths');

module.exports = {
    name: 'server',
    target: 'node',
    entry: `${pathConfig.srcDir}/server.jsx`,
    output: {
        path: pathConfig.outputDir,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
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
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:10]',
                            sourceMap: false
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
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new StatsPlugin('stats.json', {
            chunkModules: true,
            modules: true,
            chunks: true,
            exclude: [/node_modules[\\\/]react/]
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../package.json'),
                to: path.join(pathConfig.mainOutDir, 'package.json')
            },
            {
                from: path.join(__dirname, '../express/production.js'),
                to: path.join(pathConfig.mainOutDir, 'express.js')
            }
        ])
    ]
};
