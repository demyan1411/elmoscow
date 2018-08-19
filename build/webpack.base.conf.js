'use strict'
const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'images': resolve('src/assets/images'),
            'scss': resolve('src/assets/scss'),
            // 'fonts': resolve('src/assets/fonts'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.font\.(js|json)$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        'raw-loader',
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: 'url\\("/',
                                replace: 'url("../',
                                flags: 'gm'
                            },
                        },
                        'webfonts-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "sass-loader"
                    }],
                    publicPath: '../',
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract([
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 minimize: true
            //             }
            //         },
            //         {
            //             loader: 'sass-loader'
            //         }
            //     ])
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit: 10000,
                    limit: 1,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit: 10000,
                    name: utils.assetsPath('media/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
    // E:\OpenServer\domains\vue-starterkit\dist
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: 'qwe.html',
        //     template: resolve('pug/qwe.pug'),
        //     inject: true
        // }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('templates/pages/index.pug'),
            inject: true
        }),

        new HtmlWebpackPlugin({
            filename: 'products.html',
            template: resolve('templates/pages/products.pug'),
            inject: true
        }),

        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: resolve('templates/pages/product.pug'),
            inject: true
        }),

        new HtmlWebpackPlugin({
            filename: 'news.html',
            template: resolve('templates/pages/news.pug'),
            inject: true
        }),

        new HtmlWebpackPlugin({
            filename: 'news-post.html',
            template: resolve('templates/pages/news-post.pug'),
            inject: true
        }),

        new ExtractTextPlugin({
            filename: 'css/app.css',
            allChunks: true
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor_libs'
        // }),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            // "window.jQuery": "jquery/dist/jquery.min.js",
            // moment: 'moment',
            axios: 'axios',
            Popper: ['popper.js', 'default'],
            // Util: "exports-loader?Util!bootstrap/js/dist/util.js",
            // Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            // Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse"
        }),
        // new webpack.ContextReplacementPlugin(
        //     /moment[\/\\]locale$/,
        //     /us|de/
        // ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        }),
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
