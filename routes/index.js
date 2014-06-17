
/*
 * GET home page.
 */

var app = require('../app');

app.get('/', function(req, res){
  res.render('index', { title: 'Alouise' });
});

require('./sections');
require('./users');
