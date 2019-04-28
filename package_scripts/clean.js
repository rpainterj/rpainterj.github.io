var shell = require('shelljs'),
	ex = shell.exec;

// ****************** //
// * Site             //
// ****************** //

// ** CSS ** //
ex(`node ./package_scripts/clean-sass.js`);

// ** SVG ** //
ex(`del-cli "symbol/sprite.symbol.html" `);
ex(`del-cli "symbol/sprite.css" `);
ex(`del-cli "symbol/svg/sprite.symbol.svg" `);