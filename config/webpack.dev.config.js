"use strict"
const fs = require("fs");

// webpack plugin 사용을 위한 의존성
const webpack = require("webpack");

// css 관련 패키지
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// html 번들 파일 생성
const HtmlWebpackPlugin = require("html-webpack-plugin");
function parserHTML(string){
	let s = string;
	const link = `<link href="style/app.css" rel="stylesheet"></link>`;
	const script = `<script type="text/javascript" src="js/vendor.js"></script><script type="text/javascript" src="js/app.js"></script>`;
	s = s.replace("</head>", `${link}</head>`);
	s = s.replace("</body>", `${script}</body>`);
	return s;
};
module.exports = {
	output : {
		filename : "js/[name].js"
	},
	module : {
		rules : [
			{
				test : require.resolve("jquery"),
				use : [
					{
						loader : "expose-loader",
						options : "$"
					}
				]
			}
		]
	},
	plugins : [
		// 변경된 파일이 있을 경우 페이지 자동 리로드
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename : "style/[name].css"
		}),
		// 프로젝트에 상태(변수)값 전달
		new webpack.DefinePlugin({
			"process.env" : {
				NODE_ENV : '"development"'
			}
		})
	],
	// webpack dev server 설정
	devServer : {
		before(app, server){
			app.get("/", function(req, res){
				fs.readFile(__dirname + "/../index.html", "utf8", (err, data) => {
					if(err) return console.log(err);
					res.end(parserHTML(data));
				});
			});
			app.get("/sub", function(req, res){
				fs.readFile(__dirname + "/../sub.html", "utf8", (err, data) => {
					if(err) return console.log(err);
					res.end(parserHTML(data));
				});
			});
		}
	}
};