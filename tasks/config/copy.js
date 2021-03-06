/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        dev: {
            files: [{
                expand: true,
                cwd: './assets',
                src: ['**/*.!(coffee|less)'],
                dest: '.tmp/public'
            }, {
                expand: true,
                cwd: './node_modules/video.js/dist',
                src: ['video.min.js'],
                dest: '.tmp/public/js'
            }, {
                expand: true,
                cwd: './node_modules/video.js/dist/ie8',
                src: ['videojs-ie8.min.js'],
                dest: '.tmp/public/js'
            }, {
                expand: true,
                cwd: './node_modules/video.js/dist',
                src: ['video-js.min.css'],
                dest: '.tmp/public/css'
            }, {
                expand: true,
                cwd: './node_modules/videojs-playlist/dist',
                src: ['videojs-playlist.min.js'],
                dest: '.tmp/public/js'
            }, {
                expand: true,
                cwd: '/node_modules/videojs-playlist/dist',
                src: ['video-js.min.css'],
                dest: '.tmp/public/css'
            }, {
                expand: true,
                cwd: '/assets/js',
                src: ['videoController.js'],
                dest: '.tmp/public/js'
            }, ]
        },
        build: {
            files: [{
                expand: true,
                cwd: '.tmp/public',
                src: ['**/*'],
                dest: 'www'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
