# learn how to use webpack

## 打包css,js,less,typescript并启动自动编译且刷新浏览器的server

### 第一步
    新建一个文件夹并且进入文件夹内部，打开命令行窗口（按住shift+鼠标右键）
    再输入:
    npm init -y
    
### 第二步
    先安装webpack:
    cnpm install webpack --save-dev
    
### 第三步
    安装一系列需要的包，如css-loader style-loader...
    cnpm install less typescript less-loader style-loader css-loader ts-loader webpack-dev-server webpack-cli --save-dev
    
### 第四步
    新建一个webpack.config.js  --webpack配置文件
    样例：
    const path = require("path");
    module.exports = {
        entry: __dirname + "/show/app/app.js",  //入口文件，里需要import '...';
        output: {  //出口文件
            path: path.join(__dirname, "/show/dist"),
            filename: "bundle.js",
            publicPath: '/assets/'  //指定webpack服务器用的内存里的js
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
    
### 第五步（打包ts会用到，不用ts直接跳过）
    加入tsconfig.json:
    {
      "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "sourceMap": true
      },
      "exclude": [
        "node_modules"
      ]
    }
    
### 第六步
    package.json下的script会加入启动服务器的入口:
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack",  //需要加入的
        "server": "webpack-dev-server --open"  //需要加入的
      },
      
### 第七步
    写好入口文件:
    import '../css/testCss.css';
    import '../less/testLess.less';
    import '../js/testJs.js';
    import '../ts/testTs.ts';
    
### 第八步（重点）
    index.html里的script的路径是在内存中的路径，因此不能写死！！！原因是webpack的服务器每次编译不会去更新你真实的打包后的js文件
    <script src="assets/bundle.js"></script>
    
### 最后
    没什么问题就可以启动服务器啦！
    npm run server
    
#### 其他：
    打包css或less时需要安装loader，因为你是将css打包到js里去执行的。
    
    打包ts的时候会需要一个tsconfig.json文件，因为打包ts,它会先去读tsconfig.json文件，没有会报错
    
    如果打包es6就自己百度吧！和webpack.config.js里面css那些写法都差不多，只不过要安装babel-loader
    
    启动服务器的步骤比较多。注意package.json文件里的script。注意webpack.config.js里会多配置代码devServer，且output会多一行指定路径。注意index.html里的路径是内存路径。
    
    前三步最好不要乱，我就因为乱错了好多次。
    
    
    