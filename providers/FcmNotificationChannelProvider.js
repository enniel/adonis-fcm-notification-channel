'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const ServiceProvider = require('adonis-fold').ServiceProvider

class FcmNotificationChannelProvider extends ServiceProvider {
  * register () {
    this.app.bind('Adonis/Notifications/FcmMessage', function () {
      return require('../src/FcmMessage')
    })
    this.app.singleton('Adonis/Notifications/FcmSender', function (app) {
      const Config = app.use('Adonis/Src/Config')
      const FcmSender = require('../src/FcmSender')
      return new FcmSender(Config.get('services.fcm.token'), Config.get('services.fcm.requestOptions', {}))
    })
  }

  * boot () {
    const NotificationManager = this.app.use('Adonis/Notifications/Manager')
    NotificationManager.extend('fcm', function (app) {
      const FcmSender = app.use('Adonis/Notifications/FcmSender')
      const FcmChannel = require('../src/FcmChannel')
      return new FcmChannel(FcmSender)
    })
  }
}

module.exports = FcmNotificationChannelProvider
