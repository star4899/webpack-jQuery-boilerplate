"use strict"
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, option) => {
	const config = {
		mode : option.mode,
		entry : ["@babel/polyfill","./src/index.js"],
		output : {
			path : path.resolve(__dirname + "/dist/src")
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
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$ : "jquery",
				jQuery : "jquery"
			}),
			new MiniCssExtractPlugin({
				filename: "style/[name].css"
			}),
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : `"${option.mode}"`
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
			}
		},
		resolve : {
			alias : {
				"@" : path.resolve(__dirname + "/src"),
				"~" : path.resolve(__dirname, "../")
			},
			extensions : ["*", ".js", ".json"]
		}
	};
	if(option.mode === "production"){
		config.output.filename = "[name].[chunkhash].js";
		config.plugins.push(
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions : {
					discardComments : {
						removeAll : true
					}
				}
			}),
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "../index.html",
				inject : true,
				minify : true
			})
		);
	}else{
		config.output.filename = "[name].[hash].js";
		config.module.rules.push({
			test : require.resolve("jquery"),
			use : [
				{
					loader : "expose-loader",
					options : "jQuery"
				},{
					loader : "expose-loader",
					options : "$"
				}
			]
		});
		config.plugins.push(
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "./index.html",
				inject : true,
				minify : true
			})
		);
	};
	return config;
};