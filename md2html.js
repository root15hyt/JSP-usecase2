// markedモジュールをmarkedとしてインポートする。
const marked = require("marked");

// 与えられたオプションを元に、markedによってMarkdown文字列をHTMLに変換する変数をエクスポートする。
module.exports = (markdown, cliOptions) => {
    return marked(markdown, {
        gfm: cliOptions.gfm,
    });
};