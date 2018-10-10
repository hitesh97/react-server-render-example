const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mainOutDir = path.join(__dirname, '../dist');
const outputDir = path.join(__dirname, '../dist/public');
const srcDir = path.join(__dirname, '../src');

module.exports = [
    {
        name: 'client',
        target: 'web',
        entry: `${srcDir}/client.jsx`,
        output: {
            path: outputDir,
            filename: 'client.js',
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
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
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
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new CleanWebpackPlugin(mainOutDir),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    drop_console: true,
                    drop_debugger: true
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    },
    {
        name: 'server',
        target: 'node',
        entry: `${srcDir}/server.jsx`,
        output: {
            path: outputDir,
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
                    to: path.join(mainOutDir, 'package.json')
                },
                {
                    from: path.join(__dirname, '../express/production.js'),
                    to: path.join(mainOutDir, 'express.js')
                }
            ])
        ]
    }
];
