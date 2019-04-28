var shell = require('shelljs')
	ex = shell.exec;

// ****************** //
// * Site             //
// ****************** //

ex(`sass scss/main.scss css/main.css --no-source-map`);
