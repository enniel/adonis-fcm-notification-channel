'use strict'

const NE = require('node-exceptions')

class CouldNotSendNotification extends NE.LogicalException {
  static missingRecipient () {
    return new CouldNotSendNotification('Notification was not sent. You should specify recipient for sending notification.')
  }

  static missingApiKey () {
    return new CouldNotSendNotification('Notification was not sent. You should specify apiKey for sending notification.')
  }
}

module.exports = CouldNotSendNotification
