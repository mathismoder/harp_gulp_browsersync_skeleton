var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var cp          = require('child_process');

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname + "/src", {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["src/**/*.css", "src/**/*.sass", "src/**/*.scss", "src/**/*.less"], function () {
      reload("main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["src/**/*.html", "src/**/*.ejs", "src/**/*.jade", "src/**/*.js", "*.json", "*.md"], function () {
      reload();
    });
  })
});

gulp.task('build', function (done) {
  cp.exec('harp compile src dist', {stdio: 'inherit'})
    .on('close', done)
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
