var gulp = require("gulp");
var typescript = require("gulp-typescript");
var mocha = require("gulp-mocha");
var cover = require("gulp-coverage");
var del = require("del");

gulp.task("clean", function(cb) {
    del([
        "bin/**/*"
    ], cb);
});

gulp.task("build-copy", function() {
    return gulp.src([
        "./*.json", "**/*.json",
        "!node_modules/*.json", "!node_modules/**/*.json",
        "./*.js", "**/*.js", "!bin/*.js", "!bin/**/*.js", "!Gulpfile.js",
        "!node_modules/*.js", "!node_modules/**/*.js"])
        .pipe(gulp.dest("./bin"));
});

gulp.task("build-src", function() {
    return gulp.src(["./src/*.ts", "./src/**/*.ts"])
        .pipe(typescript())
        .js
        .pipe(gulp.dest("./bin/src"));
});

gulp.task("build-test", function() {
    return gulp.src(["./test/*.ts", "./test/**/*.ts"])
        .pipe(typescript())
        .js
        .pipe(gulp.dest("./bin/test"));
});

gulp.task("build", ["build-copy", "build-src", "build-test"]);

gulp.task("test", ["build"], function() {
    return gulp.src("./bin/test/*.js", { read: false })
        //.pipe(cover.instrument({
        //    pattern: ['bin/src/*.js', 'bin/src/**/*.js'],
        //    debugDirectory: 'debug'
        //}))
        .pipe(mocha({ reporter: "spec"}));
        /*.pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest("./cover"));*/
});

gulp.task("watch-src", ["tsc-src"], function() {
    return gulp.watch(["src/*", "src/**/*"], ["tsc-src"]);
});

gulp.task("watch-test", ["tsc-test"], function() {
    return gulp.watch(["test/*", "test/**/*"], ["tsc-test"]);
});

gulp.task("watch", ["watch-src", "watch-test"]);

gulp.task("default", ["test"]);
