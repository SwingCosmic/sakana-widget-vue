const gulp = require("gulp");
const fs = require("fs").promises;
const del = require("del");
const util = require("util");
const ps = require('child_process');


function getExecName(cmd) {
    return process.platform === "win32" ? (cmd + ".cmd") : cmd;
}

async function clear() {
    await del([
        "./dist/",
        "./lib/",
    ]);
}

function tsc() {
    return ps.spawn(getExecName("tsc"), {
        stdio: "inherit"
    });
}

function webpackProd() {
    return ps.spawn(getExecName("webpack"), 
        ["--config", "./.webpack/webpack.prod.js"], 
        {
            stdio: "inherit"
        }
    );
}

async function outputFix() {
    const files = await fs.readdir("./lib");
    for (const file of files.filter(f => f.endsWith(".js"))) {
        console.log("Current fix "+ file);
        const name = "./lib/" + file;
        let code = (await fs.readFile(name)).toString();

        // 修复webpack5模块被其它webpack项目引用时，webpack相关变量名重复的问题
        code = code.replace(/__webpack_require__/g, "__sakana_webpack_require__");
        code = code.replace(/__webpack_exports__/g, "__sakana_webpack_exports__");
        code = code.replace(/__webpack_modules__/g, "__sakana_webpack_modules__");

        await fs.writeFile(name, code);
    }
}

exports.default = gulp.series(
    clear,
    tsc,
    webpackProd,
    outputFix
);