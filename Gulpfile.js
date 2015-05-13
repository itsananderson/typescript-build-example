var gulp = require("gulp");
var typescript = require("gulp-typescript");
var merge = require("merge2");
var mocha = require("gulp-mocha");
var cover = require("gulp-coverage");
var del = require("del");

var tsSrcProj = typescript.createProject({noExternalResolve: true});
var tsTestProj = typescript.createProject({noExternalResolve: true});

gulp.task("clean", function(cb) {
    del([
        "bin/**/*"
    ], cb);
});

gulp.task("build-copy", function() {
    return gulp.src([
        "./*.json", "**/*.json",
        "./*.js", "**/*.js",
        "!Gulpfile.js",
        "!node_modules/*", "!node_modules/**/*",
        "!bin/*", "!bin/**/*",])
        .pipe(gulp.dest("./bin"));
});

gulp.task("build-src", function() {
});

gulp.task("build", function() {
    var srcResult = gulp.src(["./src/*.ts", "./src/**/*.ts", "./definitions/*.d.ts"])
            .pipe(typescript(tsSrcProj));
    var testResult = gulp.src(["./test/*.ts", "./test/**/*.ts", "./definitions/*.d.ts"])
            .pipe(typescript(tsTestProj));
    return merge([
        srcResult.js.pipe(gulp.dest("./bin/src")),
        testResult.js.pipe(gulp.dest("./bin/test"))]);
});

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

gulp.task("watch", ["test"], function() {
    return gulp.watch(["src/*", "src/**/*", "test/*", "test/**/*"], ["test"]);
});

gulp.task("default", ["test"]);
