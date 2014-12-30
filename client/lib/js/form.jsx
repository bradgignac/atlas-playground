var React = require('react');

var Form = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return { email: '', subject: '', message: '', processing: false };
  },
  render: function () {
    return (
      <form onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="ap-email">Email</label>
          <input id="ap-email" className="form-control" type="email" required="true" autoFocus="true" value={this.state.email} onChange={this.setEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="ap-subject">Subject</label>
          <input id="ap-subject" className="form-control" type="text" required="true" value={this.state.subject} onChange={this.setSubject} />
        </div>
        <div className="form-group">
          <label htmlFor="ap-message">Message</label>
          <textarea id="ap-message" className="form-control" rows="5" required="true" value={this.state.message} onChange={this.setMessage} />
        </div>
        <div className="clearfix">
          <button className="btn btn-primary pull-right" type="submit" disabled={this.state.processing}>Get In Touch</button>
        </div>
      </form>
    );
  },
  setEmail: function (e) {
    this.setState({ email: e.target.value });
  },
  setSubject: function (e) {
    this.setState({ subject: e.target.value });
  },
  setMessage: function (e) {
    this.setState({ message: e.target.value });
  },
  submit: function (e) {
    var self;

    self = this;
    self.setState({ processing: true });
    e.preventDefault();

    setTimeout(function () {
      self.setState({ processing: false });
      self.props.onSubmit();
    }, 5000);
  },
  reset: function () {
    this.setState({ email: '', subject: '', message: '' });
  }
});

module.exports = Form;
