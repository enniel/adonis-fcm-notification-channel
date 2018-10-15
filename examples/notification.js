'use strict'

const path = require('path')
const { Config } = require('@adonisjs/sink')
const { ioc, registrar } = require('@adonisjs/fold')

const run = async () => {
  ioc.singleton('Adonis/Src/Config', () => {
    const config = new Config()
    config.set('services.fcm.apiKey', process.env.FCM_API_KEY)
    return config
  })
  ioc.alias('Adonis/Src/Config', 'Config')

  ioc.singleton('Adonis/Src/Event', () => {
    const Event = require('@adonisjs/framework/src/Event')
    return new Event(ioc.use('Config'))
  })
  ioc.alias('Adonis/Src/Event', 'Event')

  await registrar
    .providers([
      'adonis-notifications/providers/NotificationsProvider',
      path.join(__dirname, '../providers/FcmNotificationChannelProvider')
    ])
    .registerAndBoot()

  class User {
    routeNotificationFor () {
      return 'routeNotificationForFcm'
    }

    routeNotificationForFcm () {
      return [process.env.DEVICE_TOKEN]
    }
  }

  const FcmMessage = ioc.use('FcmMessage')

  class PushTestNotification {
    constructor (animal) {
      this.animal = animal
    }

    static get type () {
      return 'pushtest'
    }

    via () {
      return ['fcm']
    }

    toFcm () {
      const message = new FcmMessage()
      switch (this.animal) {
        case 'cat':
          message.addNotification('title', 'Cat')
          message.addNotification('body', 'Meow!')
          message.addNotification('icon', 'cat_black')
          message.addNotification('color', '#ffab00')
          message.addNotification('sound', 'default')
          message.addData('animal', 'cat')
          break

        case 'cow':
          message.addNotification('title', 'Cow')
          message.addNotification('body', 'Moo!')
          message.addNotification('icon', 'cow_black')
          message.addNotification('color', '#aeaeaf')
          message.addNotification('sound', 'default')
          message.addData('animal', 'cow')
          break

        case 'dog':
          message.addNotification('title', 'Dog')
          message.addNotification('body', 'Woof!')
          message.addNotification('icon', 'dog_black')
          message.addNotification('color', '#b19267')
          message.addNotification('sound', 'default')
          message.addData('animal', 'dog')
          break

        case 'duck':
          message.addNotification('title', 'Duck')
          message.addNotification('body', 'Quack!')
          message.addNotification('icon', 'duck_black')
          message.addNotification('color', '#bd7f00')
          message.addNotification('sound', 'default')
          message.addData('animal', 'duck')
          break

        case 'pig':
          message.addNotification('title', 'Pig')
          message.addNotification('body', 'Oink!')
          message.addNotification('icon', 'pig_black')
          message.addNotification('color', '#d37b93')
          message.addNotification('sound', 'default')
          message.addData('animal', 'pig')
          break

        default:
          message.addNotification('title', 'Animal')
          message.addNotification('body', 'A wild animal has appeared!')
          message.addNotification('sound', 'default')
          break
      }
      return message
    }
  }

  const Notifications = ioc.use('Notifications')
  return Notifications.send(new User(), new PushTestNotification())
}

run()
  .then(response => {
    console.log('Response', response)
  })
  .catch(console.error)
