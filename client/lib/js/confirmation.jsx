var React = require('react');
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

var Confirmation = React.createClass({
  mixins: [OverlayMixin],
  getInitialState: function () {
    return { isModalOpen: false };
  },
  render: function () {
    return <span />;
  },
  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <span />;
    }

    return (
      <Modal title="Thanks" onRequestHide={this.hide}>
        <div className="modal-body">
          <p>Thanks for getting in touch! We'll get back to you as soon as possible.</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" autoFocus="true" onClick={this.hide}>Dismiss</button>
        </div>
      </Modal>
    );
  },
  show: function () {
    this.setState({ isModalOpen: true });
  },
  hide: function () {
    this.setState({ isModalOpen: false });
  }
});

module.exports = Confirmation;
