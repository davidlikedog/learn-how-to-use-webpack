const path = require("path");
module.exports = {
    entry: __dirname + "/show/app/app.js",  //入口文件，里需要import '...';
    output: {  //出口文件
        path: path.join(__dirname, "/show/dist"),
        filename: "bundle.js",
        publicPath: '/assets/'  //给webpack服务器用的内存里的js
    },
    devServer: {  //webpack服务器的配置
        contentBase: "./show",//本地服务器所加载的页面所在的目录
        historyApiFallback: false,//不跳转
        inline: true,//实时刷新
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "less-loader"}]
            },
            {
                test: /\.css$/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}]
            },
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
};