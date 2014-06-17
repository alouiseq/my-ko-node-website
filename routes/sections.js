
/*
 * GET sections.
 */

var app = require('../app');

// Blog
app.get('/blog', function(req, res){
  res.render('blog', { title: 'Blog' });
});

// Portfolio 
app.get('/portfolio', function(req, res){
  res.render('portfolio', { title: 'Portfolio' });
});

// Projects
app.get('/projects', function(req, res){
  res.render('projects', { title: 'Projects' });
});

// Contacts
app.get('/contacts', function(req, res){
  res.render('contacts', { title: 'Contacts' });
});

