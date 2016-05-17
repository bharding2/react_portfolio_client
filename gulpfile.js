const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

var serverFiles = ['./*.js'];
var appFiles = ['./app/**/*.jsx'];

gulp.task('webpack:dev', ['html:dev', 'css:dev'], () => {
  return gulp.src('app/js/entry.jsx')
    .pipe(webpack({
      output: {
        filename: './bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            include: __dirname + '/app/js/',
            loader: 'babel'
          }
        ]
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('html:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint('./app/js/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint', ['lint:server', 'lint:app']);

gulp.task('default', ['lint', 'webpack:dev']);
