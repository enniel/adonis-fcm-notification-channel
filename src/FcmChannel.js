'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const NE = require('node-exceptions')
const FcmMessage = require('./FcmMessage')

class FcmChannel {
  constructor (sender) {
    this.sender = sender
  }

  * send (notifiable, notification) {
    const message = this.getMessage(notifiable, notification)
    const tokens = yield notifiable.routeNotificationFor('fcm')
    return yield this.sender.send(message, tokens)
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
