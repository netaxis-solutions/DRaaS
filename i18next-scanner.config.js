const fs = require("fs");
const chalk = require("chalk");
const config = require("./public/configs/default/app.config.json");

module.exports = {
  input: ["./src/**/*.{js,jsx,ts,tsx}"],
  output: "./",
  options: {
    debug: true,
    sort: true,
    removeUnusedKeys: false,
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx", "ts", ".tsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      fallbackKey: function (_, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: "module", // defaults to 'module'
      },
    },
    // TODO: get Languages list
    lngs: config.languages,
    ns: ["translation"],
    defaultLng: "en",
    defaultNs: "translation",
    defaultValue: function (lng, _, key) {
      return lng === "en" ? key : "__NOT_TRANSLATED__";
    },
    resource: {
      loadPath: `public/locales/{{lng}}/translation.json`,
      savePath: `public/locales/{{lng}}/translation.json`,
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: ":",
    keySeparator: ".",
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;
    parser.parseFuncFromString(
      content,
      { list: ["i18next.t", "i18n.t", "t"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: ":",
            keySeparator: ".",
          }),
        );
        ++count;
      },
    );

    if (count > 0) {
      console.log(
        `i18n-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
