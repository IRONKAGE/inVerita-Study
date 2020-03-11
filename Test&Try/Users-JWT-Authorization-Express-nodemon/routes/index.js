var fs = require('fs');
var path = require('path');

module.exports = (app) => {
	fs.readdirSync('routes/api/').forEach((file) => {
		require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
	})
}