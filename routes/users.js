/*
 * Other scripts
 */

var app = require('../app'),
    nodemailer = require('nodemailer');    // send out emails


app.post('/email', function(req, res) {
  // create transport method
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'louieq56@gmail.com',
      pass: 'hello5669!'
    }
  });
  // setup email data
  var mailOpts = {
    from: req.body.name + ' <' + req.body.sender + '>',
    to: 'louieq56@gmail.com',
    subject: 'Email from my website',
    text: req.body.sender + ' says\n\n' + req.body.message
  };
  // send mail
  smtpTransport.sendMail(mailOpts, function(err, response) {
    if(err) {
      console.log(err);
      res.send({msg: err});
    }
    else {
      console.log('Message delivered: ' + response.message);
      res.send({msg: null});
    }
  });
});
