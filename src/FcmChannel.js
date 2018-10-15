'use strict'

const NE = require('node-exceptions')
const FcmMessage = require('./FcmMessage')

class FcmChannel {
  constructor (sender) {
    this.sender = sender
  }

  async send (notifiable, notification) {
    const message = this.getMessage(notifiable, notification)
    const tokens = await notifiable.routeNotificationFor('fcm')
    return this.sender.send(message, tokens)
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
