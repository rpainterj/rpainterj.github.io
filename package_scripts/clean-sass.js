var shell = require('shelljs'),
	ex = shell.exec;

// ****************** //
// * Site             //
// ****************** //

// ** CSS ** //
ex(`del-cli "css/main.css"`);
ex(`del-cli "css/**/*.min.css"`);
ex(`del-cli "css/**/*.css.map"`);