var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var props = {
		title: 'Laboratorio 4 Infraestructura Computacional ',
		subtitle: 'Sistema de autenticación con TCP',
		lista: "Conexión"
	};

	res.render('index', props);
});

module.exports = router;
