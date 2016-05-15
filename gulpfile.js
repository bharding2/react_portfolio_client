const gulp = require('gulp');
const webpack = require('webpack-stream');

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
