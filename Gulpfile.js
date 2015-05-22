var gulp = require("gulp");
var typescript = require("gulp-typescript");
var merge = require("merge2");
var mocha = require("gulp-mocha");
var cover = require("gulp-coverage");
var istanbul = require("gulp-istanbul");
var del = require("del");

var tsSrcProj = typescript.createProject({noExternalResolve: true, module: 'commonjs'});
var tsTestProj = typescript.createProject({noExternalResolve: true, module: 'commonjs'});

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
        "!bin/*", "!bin/**/*"])
        .pipe(gulp.dest("./bin"));
});

gulp.task("build", function() {
    var libResult = gulp.src(["./lib/*.ts", "./lib/**/*.ts", "./definitions/**/*.d.ts", "./definitions/harness.d.ts"])
            .pipe(typescript(tsSrcProj));
    var testResult = gulp.src(["./test/*.ts", "./test/**/*.ts", "./definitions/**/*.d.ts", "./definitions/test-harness.d.ts"])
            .pipe(typescript(tsTestProj));
    return merge([
        libResult.js.pipe(gulp.dest("./bin/lib")),
        testResult.js.pipe(gulp.dest("./bin/test"))]);
});

gulp.task("test", ["build"], function() {
    return gulp.src("./bin/test/*.js", { read: false })
        .pipe(mocha({ reporter: "spec"}));
});

gulp.task("istanbul", ["build"], function(cb) {
    gulp.src("./bin/lib/*.js")
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire())
        .on("finish", function() {
            gulp.src("./bin/test/*.js", { read: false })
                .pipe(mocha({ reporter: "spec" }))
                .pipe(istanbul.writeReports())
                .on("end", cb);
        });
});

gulp.task("cover", ["build"], function() {
    return gulp.src("./bin/test/*.js", { read: false })
        .pipe(cover.instrument({
            pattern: ['bin/lib/*.js', 'bin/lib/**/*.js']
        }))
        .pipe(mocha({ reporter: "spec"}))
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest("./cover"));
});

gulp.task("watch", ["test"], function() {
    return gulp.watch(["lib/*", "lib/**/*", "test/*", "test/**/*"], ["test"]);
});

gulp.task("default", ["istanbul"]);
