"use strict"
const path = require("path");

// webpack plugin 사용을 위한 연결
const webpack = require("webpack");

// config object 를 합치기 위한 패키지
const merge = require("webpack-merge");

// css 관련 패키지
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// webpack config 모음
const devConfig = require("./config/webpack.dev.config");
const buildConfig = require("./config/webpack.build.config");

module.exports = (env, option) => {
	const baseConfig = {
		mode : option.mode,
		entry : {
			app : ["@babel/polyfill","./src/index.js"]
		},
		output : {
			path : path.resolve(__dirname + "/dist")
		},
		module : {
			rules : [
				{
					test : /\.js$/,
					exclude : /node_modules/,
					loader : "babel-loader"
				},
				{
					test : /\.(scss|css)$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"postcss-loader",
						"sass-loader"
					]
				},
				{
					test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					loader : "url-loader",
					options: {
						name : "images/[name].[ext]"
					}
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$ : "jquery"
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions : {
					discardComments : {
						removeAll : true
					}
				}
			})
		],
		optimization: {
			splitChunks : {
				cacheGroups : {
					vendor : {
						test : /\.js$/,
						chunks : "initial",
						name : "vendor",
						enforce : true,
					},
					styles : {
						test : /\.css$/,
						chunks : "all",
						enforce : true
					}
				}
			},
			minimize : true
		},
		resolve : {
			alias : {
				"@" : path.resolve(__dirname + "/src")
			},
			extensions: ["*", ".js", ".json"]
		}
	};
	return merge(baseConfig, option.mode === "production" ? buildConfig : devConfig);
};