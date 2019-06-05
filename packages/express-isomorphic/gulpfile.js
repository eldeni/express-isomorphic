const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const util = require('util');

const tsConfig = require('./tsconfig.json');

const paths = {
  lib: path.resolve(__dirname, 'lib'),
  src: path.resolve(__dirname, 'src'),
};

const buildLog = (tag, ...args) => {
  console.info(chalk.cyan(`[gulp>${tag}]`), util.format(...args));
};

gulp.task('clean', () => {
  buildLog('clean', 'LIB_PATH: %s', paths.lib);

  return del([
    `${paths.lib}/**/*`,
  ]);
});

gulp.task('tsc', gulp.series('clean', function _tsc(done) {
  buildLog('tsc', 'tsc config: %o', tsConfig.compilerOptions);
  const tsProject = ts.createProject('tsconfig.json');

  return gulp.src([`${paths.src}/**/*.{ts,tsx}`])
    .pipe(tsProject())
    .pipe(gulp.dest(paths.lib));
}));

gulp.task('build', gulp.series('clean', 'tsc'));