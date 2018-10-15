'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class FcmNotificationChannelProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Notifications/FcmMessage', () => {
      return require('../src/FcmMessage')
    })
    this.app.alias('Adonis/Notifications/FcmMessage', 'FcmMessage')
    this.app.singleton('Adonis/Notifications/FcmSender', app => {
      const Config = app.use('Adonis/Src/Config')
      const FcmSender = require('../src/FcmSender')
      const apiKey = Config.get('services.fcm.apiKey')
      const options = Config.get('services.fcm.requestOptions', {})
      return new FcmSender(apiKey, options)
    })
    this.app.alias('Adonis/Notifications/FcmSender', 'FcmSender')
  }

  boot () {
    const NotificationManager = this.app.use('Notifications')
    NotificationManager.extend('fcm', () => {
      const FcmSender = this.app.use('FcmSender')
      const FcmChannel = require('../src/FcmChannel')
      return new FcmChannel(FcmSender)
    })
  }
}

module.exports = FcmNotificationChannelProvider
