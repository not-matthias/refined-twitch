const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
//

const pagesObj = {};
const chromeName = ["popup", "options"];
chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.ts`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});


// Copy the manifest
//
const plugins = [
  process.env.NODE_ENV === "production" ?
    {
      from: path.resolve("src/manifest.production.json"),
      to: `${path.resolve("dist")}/manifest.json`
    }
    :
    {
      from: path.resolve("src/manifest.development.json"),
      to: `${path.resolve("dist")}/manifest.json`
    }
];

module.exports = {
  filenameHashing: false,
  pages: pagesObj,
  configureWebpack: {
    entry: {
      background: './src/background/index.ts',
      content: './src/content/index.ts',
    },
    resolve: {
      extensions: ['.ts'],
    },
    module: {
      rules: [
        {
          test: /\.ts?/,
          exclude: /(options|popup)/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                happyPackMode: true // https://stackoverflow.com/a/53411833
              }
            }
          ]
        }
      ]
    },
    plugins: [CopyWebpackPlugin(plugins)]
  },

  transpileDependencies: [
    'vuetify'
  ]
};
