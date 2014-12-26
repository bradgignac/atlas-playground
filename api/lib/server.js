var express = require('express');
var bodyParser = require('body-parser');
var form = require('./form');
var submission = require('./submission');

var app = express();

app.use(bodyParser.json());

app.post('/submissions', function (req, res) {
  form.validate(req.body, function (err, data) {
    if (err) {
      res.status(400);
      res.send({ message: 'Your message could not be sent.', errors: err });
      res.end();
      return;
    }

    submission.submit(data, function (err) {
      if (err) {
        res.status(500);
        res.send({ message: err });
        res.end();
      } else {
        res.status(202);
        res.send({ message: 'Your message was successfully sent!' });
        res.end();
      }
    });
  });
});

module.exports = app;
