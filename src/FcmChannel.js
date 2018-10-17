'use strict'

const NE = require('node-exceptions')
const FcmMessage = require('./FcmMessage')
const CouldNotSendNotification = require('./CouldNotSendNotification')

class FcmChannel {
  constructor (sender) {
    this.sender = sender
  }

  async send (notifiable, notification) {
    const message = this.getMessage(notifiable, notification)
    let recipient = message.recipient
    if (!recipient) {
      recipient = await notifiable.routeNotificationFor('fcm')
    }
    if (!recipient) {
      throw CouldNotSendNotification.missingRecipient()
    }
    return this.sender.send(message, recipient)
  }

  getMessage (notifiable, notification) {
    if (typeof notification.toFcm === 'function') {
      return notification.toFcm(notifiable)
    }

    if (typeof notification.toJSON === 'function') {
      return new FcmMessage(notification.toJSON(notifiable))
    }

    throw new NE.RuntimeException('Notification is missing [toFcm / toJSON] method.')
  }
}

module.exports = FcmChannel
