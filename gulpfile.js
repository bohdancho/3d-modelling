let project_folder = 'dist',
  source_folder = 'src',
  vendor_folder = 'node_modules';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
    favicons: project_folder + '/'
  },
  src: {
    html: source_folder + '/*.html',
    sass: source_folder + '/sass/style.sass',
    js: source_folder + '/js/',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/**/*.{woff,woff2}',
    favicons: [
      source_folder + '/*.*',
      '!' + source_folder + '/*.html',
      '!' + source_folder + '/sass',
      '!' + source_folder + '/js',
      '!' + source_folder + '/img',
      '!' + source_folder + '/fonts'
    ]
  },
  watch: {
    html: source_folder + '/**/*.html',
    sass: source_folder + '/sass/**/*.sass',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  clean: './' + project_folder + '/'
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  del = require('del'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webp_html = require('gulp-webp-html'),
  webp_css = require('gulp-webpcss');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    open: false,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.sass)
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowsersList: ['last 5 versions'],
        cascade: true,
      })
    )
    .pipe(webp_css())
    .pipe(clean_css())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src([
      path.src.js + 'polyfills.js',
      vendor_folder + '/slideout/dist/slideout.js',
      vendor_folder + '/imagesloaded/imagesloaded.pkgd.js',
      vendor_folder + '/isotope-layout/dist/isotope.pkgd.js',
      vendor_folder + '/smoothscroll/smoothscroll.js',
      vendor_folder + '/inputmask/dist/inputmask.js',
      path.src.js + 'webp.js',
      path.src.js + 'script.js'
    ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function favicons() {
  return src(path.src.favicons)
    .pipe(dest(path.build.favicons))
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.sass], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, favicons));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.favicons = favicons;
exports.build = build;
exports.watch = watch;
exports.default = watch;