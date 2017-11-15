import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import messageList from '@consts/messageList'

class GenericModal extends Component {
  static propTypes = {
    clearError: PropTypes.func.isRequired,
    alertCode: PropTypes.string.isRequired,
  }
  render() {
    const {
      alertCode,
      clearError,
    } = this.props

    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={() => clearError(alertCode && messageList[alertCode].path)}
      />,
    ]
    return (
      <Dialog
        title={alertCode && messageList[alertCode].title}
        actions={actions}
        open={alertCode}
        contentStyle={{ width: '400px' }}
        onRequestClose={() => clearError(alertCode && messageList[alertCode].path)}
      >
        {alertCode && messageList[alertCode].message}
      </Dialog>
    )
  }
}

export default (GenericModal)
