var cssClean = require('clean-css'),
	glob = require('glob'),
	path = require('path'),
	fs = require('fs'),
	cwd = path.resolve('./css/');

// ****************** //
// * Site             //
// ****************** //

glob.glob('**/*.css', { cwd: cwd }, (err, files) => {
	files.forEach((file) => {
		let fileData = fs.readFileSync(`css/${file}`),
			fileName = file.split('.').slice(0, -1).join('.');

		fs.writeFileSync(`css/${fileName}.min.css`, new cssClean({sourceMap: false}).minify(fileData).styles); 

		if (err) {
			console.log(`${err} in ${file}`);
		}
	});
});