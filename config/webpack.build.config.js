"use strict"
// html 번들 파일 생성
const HtmlWebpackPlugin = require("html-webpack-plugin");

// css 관련 패키지
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	output : {
		// 파일 변경시 마다 변경되는 해시값을 적용
		filename : "js/[name][chunkhash].js"
	},
	plugins : [
		new MiniCssExtractPlugin({
			filename: "style/[name][hash].css"
		}),
		// 번들용 html 설정
		new HtmlWebpackPlugin({
			template : "./index.html",
			filename : "./index.html",
			inject : true
		})
	]
};