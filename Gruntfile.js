module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readYAML('config.yml'),

        path: {
            build: 'build',
            assets: 'assets'
        },

        emailBuilder: {
            test :{
                files : {
                    '<%= path.build %>/<%= config.template %>' : '<%= config.template %>'
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= path.assets %>/css/style.css': '<%= path.assets %>/scss/style.scss'
                }
            }
        },

        copy: {
            mail: {
                files: [{
                    expand: true,
                    cwd: '<%= path.assets %>/',
                    src: ['**'],
                    dest: '<%= path.build %>/<%= path.assets %>/'
                }]
            }
        },

        imageEmbed: {
            dist: {
                src: [ '<%= path.build %>/<%= config.template %>' ],
                dest: '<%= path.build %>/<%= config.template %>',
                options: {
                    deleteAfterEncoding : false,
                    typeSrc : true
                }
            }
        },

        nodemailer: {
            options: {
                transport: {
                    type: 'Sendmail'
                },
                message: {
                    subject: '<%= config.mail.subject %>'
                },
                from: '<%= config.mail.from %>',
                recipients: [
                    {
                        email: '<%= config.mail.to.email %>',
                        name: '<%= config.mail.to.name %>'
                    }
                ]
            },
            external: {
                src: ['<%= path.build %>/<%= config.template %>']
            }
        },

        litmus: {
            test: {
                src: ['<%= path.build %>/<%= config.template %>'], 
                options: {
                    username: '<%= config.litmus.username %>',
                    password: '<%= config.litmus.password %>',
                    url: '<%= config.litmus.url %>',
                    clients: ['gmailnew', 'ffgmailnew', 'chromegmailnew'],
                    subject: '<%= config.mail.subject %>'
                }
            } 
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= path.build %>/'
                }
            }
        },

        open : {
            dev : {
                path: 'http://0.0.0.0:9001/<%= config.template %>',
                app: 'Google Chrome'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            tpl: {
                files: ['<%= config.template %>'],
                tasks: ['emailBuilder', 'copy', 'imageEmbed']
            },
            scss: {
                files: ['<%= path.assets %>/scss/*'],
                tasks: ['build']
            }
        }
    });

    grunt.registerTask('default', ['connect', 'open', 'watch']);
    grunt.registerTask('build', ['sass', 'emailBuilder', 'copy', 'imageEmbed']);
    grunt.registerTask('test', ['build', 'nodemailer']);
    grunt.registerTask('test:litmus', ['build', 'litmus']);
};
