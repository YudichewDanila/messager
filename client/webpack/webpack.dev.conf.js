const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: path.join(__dirname,'./src/assets/'),
    img:path.join(__dirname, './src/assets/img'),
    dirdirector:path.join(__dirname, '../'),
}

const devWebpackConfig = merge(baseWebpackConfig, {
    externals:{
        paths:PATHS
    },

    mode: 'development',
    
    devServer:{

        port:8081,
        static: {
            directory: PATHS.dirdirector
        },
        client:{
            overlay:true,
        }
    },
    module: {
        rules:[
        {
        test: /\.s[ac]ss$/i,
        use:[ 
           {
            loader:'style-loader',
           },
            {
                loader: 'css-loader',  
              },{
                loader: 'sass-loader',
              }
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use:[ 'file-loader']
        },
        {
            test: /\.css$/i,
            use: [  
                'style-loader',
                'css-loader'  
            ],
        },
        ]
    },
    plugins: []
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
console.log(path.join(__dirname, '../'));