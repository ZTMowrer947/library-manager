// Imports
const del = require("del");
const gulp = require("gulp");
const babel = require("gulp-babel");
const sm = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");

// Tasks
const buildServer = () => {
    return gulp
        .src([
            "src/server/**/*.ts",
            "!src/server/**/__tests__/**/*.ts",
            "!src/server/testSetup.ts",
        ])
        .pipe(sm.init())
        .pipe(babel())
        .pipe(terser())
        .pipe(sm.write("."))
        .pipe(gulp.dest("dist/server"));
};

const buildClient = () => {
    return gulp
        .src("src/client/index.ts")
        .pipe(sm.init())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(sm.write("."))
        .pipe(gulp.dest("dist/client"));
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
