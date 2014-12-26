var assert = require('assert');
var nock = require('nock');
var request = require('request');
var server = require('../lib/server');

function sendMessage(data, done) {
  request.post('http://localhost:12345/submissions', { json: data }, done);
}

describe('application', function () {
  var api, mailgun, data;

  beforeEach(function () {
    process.env.MAILGUN_DOMAIN = 'contact.bradgignac.com';
    process.env.MAILGUN_API_KEY = 'my api key';
    process.env.ATLAS_PLAYGROUND_RECIPIENT = 'recipient';

    mailgun = nock('https://api.mailgun.net', {
      reqheaders: { 'Authorization': 'Basic YXBpOm15IGFwaSBrZXk=' }
    });
    api = server.listen(12345);
  });

  afterEach(function () {
    api.close();
    mailgun.done();
  });

  it('sends message', function (done) {
    var url, data;

    url = '/v2/contact.bradgignac.com/messages';
    data = 'to=recipient&from=me%40example.com&subject=get%20in%20touch&text=call%20me%20please';

    mailgun.post(url, data).reply(200, {
      id: 'mailgun message id',
      message: 'Queued. Thank you.'
    });

    data = { from: 'me@example.com', subject: 'get in touch', text: 'call me please' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 202);
      assert.equal(body.message, 'Your message was successfully sent!');
      done();
    });
  });

  it('fails when "from" is missing', function (done) {
    data = { subject: 'get in touch', text: 'call me please' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 400);
      assert.equal(body.message, 'Your message could not be sent.');
      assert.equal(body.errors.from[0], 'From is required');
      done();
    });
  });

  it('fails when "from" is not an email address', function (done) {
    data = { from: 'notanemail', subject: 'get in touch', text: 'call me please' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 400);
      assert.equal(body.message, 'Your message could not be sent.');
      assert.equal(body.errors.from[0], 'From must be a valid email address');
      done();
    });
  });

  it('fails when "subject" is missing', function (done) {
    data = { from: 'me@example.com', text: 'call me please' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 400);
      assert.equal(body.message, 'Your message could not be sent.');
      assert.equal(body.errors.subject[0], 'Subject is required');
      done();
    });
  });

  it('fails when "text" is missing', function (done) {
    data = { from: 'me@example.com', subject: 'get in touch' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 400);
      assert.equal(body.message, 'Your message could not be sent.');
      assert.equal(body.errors.text[0], 'Body is required');
      done();
    });
  });

  it('fails when Mailgun API call fails', function (done) {
    var url, data;

    url = '/v2/contact.bradgignac.com/messages';
    data = 'to=recipient&from=me%40example.com&subject=get%20in%20touch&text=call%20me%20please';

    mailgun.post(url, data).reply(429, {
      message: 'Too many submissions'
    });

    data = { from: 'me@example.com', subject: 'get in touch', text: 'call me please' };

    sendMessage(data, function (err, res, body) {
      assert.equal(res.statusCode, 500);
      assert.equal(body.message, 'Too many submissions');
      done();
    });
  });
});
