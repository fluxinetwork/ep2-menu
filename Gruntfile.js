module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

        watch: {
        	options: {
        	  spawn: false
        	},
		    css: {
		        files: ['menu.scss'],
		        tasks: ['sass']
		    },
		    configFiles: {
			    files: ['Gruntfile.js']
			}
		},

		sass: {
		    compil: {
		    	options : {
			        style: 'expanded',
			        sourcemap: 'none'
				},
		        files: {
		            'menu.css': 'menu.scss'
		        }
		    }
		},

		

	});


	grunt.registerTask('default', []);

}