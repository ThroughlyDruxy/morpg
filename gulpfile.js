const gulp = require('gulp');
const less = require('gulp-less');

/* ----------------------------------------- */
/*  Compile LESS
/* ----------------------------------------- */

const MORPG_LESS = [
  'styles/*.less',
  'styles/sheets/actors/*.less',
  'styles/sheets/items/*.less',
];
function compileLESS() {
  return gulp
    .src('styles/morpg.less')
    .pipe(less())
    .pipe(gulp.dest('./styles/'));
}
const css = gulp.series(compileLESS);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(MORPG_LESS, css);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(gulp.parallel(css), watchUpdates);
exports.css = css;
