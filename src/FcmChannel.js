'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const NE = require('node-exceptions')
const use = require('adonis-fold').Ioc.use
const FcmMessage = use('Adonis/Notifications/FcmMessage')
const FcmSender = use('Adonis/Notifications/FcmSender')

class FcmChannel {
  * send (notifiable, notification) {
    const message = this.getMessage(notifiable, notification)
    const tokens = yield notifiable.routeNotificationFor('fcm')
    return yield FcmSender.send(message, tokens)
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
