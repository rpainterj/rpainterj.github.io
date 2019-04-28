let SVGSpriter = require('svg-sprite'),
	mkdirp = require('mkdirp'),
	path = require('path'),
	fs = require('fs'),
	File = require('vinyl'),
	glob = require('glob'),
	svgColor = function(color) {
		return function(shape, sprite, callback) {
		var paths = shape.dom.getElementsByTagName('path');
		for (var i = 0; i < paths.length; i++) {
			paths[i].setAttribute('fill', color);
		}
		callback(null);
		};
	},
	spriter = new SVGSpriter({
		expand: true,
		cwd: 'sourceimages/sourceimages/svg',
		src: ['**/*.svg'],
		dest: '',
		transform: ['svgo', {
			white: svgColor(''),
		}],
		shape: { // SVG shape related options
			dimension: { // Dimension related options
				maxWidth: 100, // Max. shape width
				maxHeight: 100, // Max. shape height
				precision: 2, // Floating point precision
				attributes: false, // Width and height attributes on embedded shapes
			},
			dest: "" // Output directory for optimized intermediate SVG shapes
		}, 
		mode: {
			symbol: {
				bust: false,
				prefix: ".icon-%s",
				render: {
					scss: false, // Activate Sass output (with default options)
					css: false // Activate Sass output (with default options)
				},
				example: true
			}
		}
	}),
	cwd = path.resolve('./sourceimages/sourceimages/svg/');


// ****************** //
// * Site             //
// ****************** //

glob.glob('**/*.svg', { cwd: cwd }, (err, files) => {
	files.forEach((file) => {
		spriter.add(new File({
			path: path.join(cwd, file),
			base: cwd,
			contents: fs.readFileSync(path.join(cwd, file))
		}));
	})

	spriter.compile((err, result) => {
		for (let mode in result) {
			for (let resource in result[mode]) {
				mkdirp.sync(path.dirname(result[mode][resource].path));
				fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
			}
		}
		if (err) {
			console.log(`${err}`);
		}
	});
});