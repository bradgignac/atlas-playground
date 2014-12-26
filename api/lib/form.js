var lgtm = require('lgtm');

var form = lgtm.validator()
  .validates('from')
    .required('From is required')
    .email('From must be a valid email address')
  .validates('subject')
    .required('Subject is required')
  .validates('text')
    .required('Body is required')
  .build();

module.exports.validate = function (data, cb) {
  form.validate(data, function (err, result) {
    if (result.valid) {
      cb(undefined, data);
    } else {
      cb(result.errors);
    }
  });
};
