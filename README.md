### About Electron 
[`Read More`](https://www.electronjs.org/)
[`Watch Here`](https://youtu.be/m3OjWNFREJo?si=cWG-dTsemKKEQLwL)

This template is a bare minimum setup for an electron project with the React framework

1. First webpack will bundle the React project which is in the side `src` folder
2. Then the bundled `.js` file will be put inside of the `index.html` file. Electron js will take care of the rest of the process then.
### Template creation process

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
    <!-- following is JS buddle after ReactJS to webpack config -->
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

### connect `main` and `render` in `preload.js` works as a bridge
[`Read More about IPC setup`](https://www.electronjs.org/docs/latest/tutorial/ipc)

[`Read More about IPC methods`](https://www.electronjs.org/docs/latest/api/ipc-main)
```js
const { ipcRenderer , contextBridge} = require('electron')

contextBridge.exposeInIsolatedWorld('electron',{
    notificationApi:{
        sendNotification(message){
            console.log('Message inside preload.js',message)
            ipcRenderer.send('notify',message)
        }
    },
    ipc: {
    invoke(method, args) {
      return ipcRenderer.invoke(method, args);
    },
    send(channel, data) {
      ipcRenderer.send(channel, data);
    },
    once: (eventName, callback) => {
      let handled = false;
      ipcRenderer.once(eventName, (event, ...args) => {
        if (!handled) {
          handled = true;
          callback(event, ...args);
          }
        });
      },
    },
    anyApi:{
        
    }
})
```

Add this if needed
```bash
npm i --save-dev electron-reload
```

This will start both the watch script for webpack and electron concurrently, along with starting your Electron app using electron-forge.
[Read More](https://www.npmjs.com/package/npm-run-all)
```bash
npm install npm-run-all --save-dev
```

Add this to `package.json`
```json
"start:dev": "npm-run-all --parallel watch start",
```

The `start:dev` script uses npm-run-all to run both `watch` and `start` concurrently.
```bash
npm run start:dev
```

[`Read More about Packaging for build`](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)

```bash
npm run package
```

Go to the following file for the build project after ran the above command (`.exe` for windows)
```bash
react-electron-template\out\react-electron-template-win32-x64\react-electron-template.exe
```