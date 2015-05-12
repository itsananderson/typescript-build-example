var gulp = require("gulp");
var typescript = require("gulp-typescript");
var mocha = require("gulp-mocha");
var cover = require("gulp-coverage");

gulp.task("tsc-src", function() {
    return gulp.src(["./src/*.ts"])
        .pipe(typescript())
        .js
        .pipe(gulp.dest("./bin/src"));
});

gulp.task("tsc-test", function() {
    return gulp.src(["./test/*.ts"])
        .pipe(typescript())
        .js
        .pipe(gulp.dest("./bin/test"));
});

gulp.task("tsc", ["tsc-src", "tsc-test"]);

gulp.task("test", ["tsc"], function() {
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
