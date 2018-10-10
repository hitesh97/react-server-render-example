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
};
