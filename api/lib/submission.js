var _ = require('lodash');
var request = require('request');

module.exports.submit = function (submission, cb) {
  var path = 'https://api.mailgun.net/v2/' + process.env.MAILGUN_DOMAIN + '/messages';
  var recipient = process.env.ATLAS_PLAYGROUND_RECIPIENT;
  var options = {
    json: true,
    form: _.assign({ to: recipient }, submission),
    auth: {
      username: 'api',
      password: process.env.MAILGUN_API_KEY
    }
  };

  request.post(path, options, function (err, res, body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cb();
    } else {
      cb(body.message);
    }
  });
};
