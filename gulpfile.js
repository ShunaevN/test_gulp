const gulp = require('gulp'); 
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');

function html() {
    return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/')).pipe(browserSync.reload({stream: true}));
  }
  
function css() {
  const plugins = [
    autoprefixer(),
    mediaquery()
    // cssnano()
  ]
    return gulp.src('src/blocks/**/*.css')
          .pipe(plumber())
          .pipe(concat('bundle.css'))
          .pipe(postcss(plugins))
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  }
  
   

  function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
              .pipe(gulp.dest('dist/images')).pipe(browserSync.reload({stream: true}));
  }

  function clean() {
    return del('dist');
  }
  

  function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/blocks/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  } 

  function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  } 


  const build = gulp.series(clean, gulp.parallel(html, css, images));
  const watchapp = gulp.parallel(build, watchFiles, serve);

  exports.clean = clean;
  exports.html = html
  exports.css = css;
  exports.images = images; 



  exports.build = build; 
  exports.watchapp = watchapp; 
  exports.default = watchapp;

  

