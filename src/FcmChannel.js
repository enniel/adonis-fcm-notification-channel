'use strict'

const NE = require('node-exceptions')
const FcmMessage = require('./FcmMessage')
const CouldNotSendNotification = require('./CouldNotSendNotification')

class FcmChannel {
  constructor (sender) {
    this.sender = sender
  }

  async send (notifiable, notification) {
    const message = await this.getMessage(notifiable, notification)
    let recipient = message.recipient
    if (!recipient) {
      recipient = await notifiable.routeNotificationFor('fcm')
    }
    if (!recipient) {
      throw CouldNotSendNotification.missingRecipient()
    }
    return this.sender.send(message, recipient)
  }

  async getMessage (notifiable, notification) {
    if (typeof notification.toFcm === 'function') {
      return notification.toFcm(notifiable)
    }

    if (typeof notification.toJSON === 'function') {
      const json = await notification.toJSON(notifiable)
      return new FcmMessage(json)
    }

    throw new NE.RuntimeException('Notification is missing [toFcm / toJSON] method.')
  }
}

module.exports = FcmChannel
