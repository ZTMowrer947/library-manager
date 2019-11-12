// Imports
const path = require("path");
const del = require("del");
const gulp = require("gulp");
const babel = require("gulp-babel");
const sm = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const ts = require("gulp-typescript");
const merge = require("merge2");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");

// TypeScript project setup
const tsProject = ts.createProject(
    path.resolve(__dirname, "src", "server", "tsconfig.json")
);

// Tasks
const buildServer = () => {
    const babelResult = tsProject
        .src()
        .pipe(sm.init())
        .pipe(babel())
        .pipe(terser())
        .pipe(sm.write("."));

    const tsResult = tsProject.src().pipe(tsProject());

    return merge([
        babelResult.pipe(gulp.dest(path.join("dist", "server"))),
        tsResult.dts.pipe(gulp.dest(path.join("dist", "server"))),
    ]);
};

const buildClient = () => {
    return gulp
        .src(path.resolve(__dirname, "src", "client", "index.ts"))
        .pipe(sm.init())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(sm.write("."))
        .pipe(gulp.dest(path.join("dist", "client")));
};

const build = gulp.series(buildClient, buildServer);

const clean = () => {
    return del(["dist"]);
};

// Exports
module.exports = {
    build,
    clean,
    default: gulp.series(clean, build),
};
