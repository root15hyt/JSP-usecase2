// Node.jsのグローバル関数requireは、ファイルパス（ここではcommander）を指定することで、変数としてインポートできる。
// commanderモジュールをprogramとしてインポートする。
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポートする。
const fs = require("fs");
// md2htmlモジュールをインポートする。
const md2html = require("./md2html")

// gfmオプションをcommander.optionで定義する。
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数をcomannderでパースする。
program.parse(process.argv);
// ファイルパスをprogram.args配列から取り出し、filePathとする。
const filePath = program.args[0];
// コマンドライン引数にオプションがある場合は、デフォルトのオプション（false）を上書きする。
const cliOptions = {
    gfm: false,
    ...program.opts(),
};
// ファイルをfsで非同期でUTF-8として読み込む。
fs.readFile(filePath, { encoding: "utf-8" }, (err, file) => {
    if (err) {
        console.error(err.message);
        // 終了ステータス１（一般的なエラー）としてprocessを終了する。
        process.exit(1);
        return;
    }
    // md2htmlモジュールを使ってMarkdownファイルをHTML文字列に変換する
    const html = md2html(file, cliOptions);
    console.log(html);
})