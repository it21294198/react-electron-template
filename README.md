1. First install dependencies: `npm install`
2. In one terminal window run: `npm run watch` to compile react code
3. In other one run: `npm start` to start Electron app

[Reference video](https://youtu.be/VCl8li22mrA?si=TGZqApow9c4km8Eb)

```bash
git init .
```

```bash
npm init -y
```

```bash
npm i --save electron
```

created `.gitignore` file and add
```fs
/node_modules
```

created `main.js` and `index.html` files rename `index.js` to `main.js` in `package.json` file.

```html
<!-- index.html -->
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self'"/>
</head>
<body>
    <div id="root">
    </div>    
    <!-- <script src="./src/js/index.js"></script> -->
    <!-- following is react to webpack config -->
    <script src="./build/js/app.js"></script>
</body>
</html>
```

### Add `start` command to `package.json`
```json
"start": "electron ."
```

```bash
npm i --save react react-dom
```

### To transpile src folder to commen js
```bash
npm i --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react css-loader style-loader webpack webpack-cli
```

### created `webpack.common.js` and add following to root folder
```js
// webpack.common.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};
```

### Add `watch` command to `package.json`
```json
"watch": "webpack --config webpack.common.js --watch"
```

### connect `main` and `render` in `preload.js`
```js
const { ipcRenderer , contextBridge} = require('electron')

contextBridge.exposeInIsolatedWorld('electron',{
    notificationApi:{
        sendNotification(message){
            console.log('Message inside preload.js',message)
            ipcRenderer.send('notify',message)
        }
    },
    filaApi:{
        
    }
})
```

```
npm i --save-dev electron-reload
```