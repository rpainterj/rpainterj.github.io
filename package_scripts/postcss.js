var shell = require('shelljs'),
	ex = shell.exec;

// ****************** //
// * Site             //
// ****************** //

ex(`postcss ./css/main.css --dir ./css/ --use autoprefixer --no-map`);