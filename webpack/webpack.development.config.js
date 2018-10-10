const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const outputDir = path.join(__dirname, '../dist/public');
const srcDir = path.join(__dirname, '../src');
var hotMiddlewareScript =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=1500&reload=true';

module.exports = [
    {
        name: 'client',
        target: 'web',
        entry: [hotMiddlewareScript, `${srcDir}/client.jsx`],
        output: {
            path: outputDir,
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
                                localIdentName: '[local]',
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
        }
    }
];
