var React = require('react');
var Confirmation = require('./confirmation.jsx');
var Form = require('./form.jsx');

var Client = React.createClass({
  render: function () {
    return (
      <div className="ap-application">
        <Form ref="form" onSubmit={this.confirm} />
        <Confirmation ref="confirmation" />
      </div>
    );
  },
  confirm: function (e) {
    this.refs.form.reset();
    this.refs.confirmation.show();
  }
});

React.render(<Client />, document.getElementById('atlas-playground-client'));
