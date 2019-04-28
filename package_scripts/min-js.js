var ug = require("uglify-es"),
	glob = require('glob'),
	path = require('path'),
	fs = require('fs'),
	cwd = path.resolve('./js/');

// ****************** //
// * Site             //
// ****************** //

glob.glob('**/!(*.min).js', { cwd: cwd }, (err, files) => {
	files.forEach((file) => {
		let fileData = fs.readFileSync(`js/${file}`, "utf8"),
			fileName = file.split('.').slice(0, -1).join('.');


		fs.writeFileSync(`js/${fileName}.min.js`, ug.minify(fileData).code); 

		if (err) {
			console.log(`${err} in ${file}`);
		}
	});
});