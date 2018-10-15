'use strict'

const test = require('japa')
const path = require('path')
const { Config } = require('@adonisjs/sink')
const { ioc, registrar } = require('@adonisjs/fold')
const FcmMessage = require('../../src/FcmMessage')
const FcmSender = require('../../src/FcmSender')
const FcmChannel = require('../../src/FcmChannel')

test.group('FcmNotificationChannelProvider', group => {
  group.before(async () => {
    ioc.singleton('Adonis/Src/Config', () => {
      const config = new Config()
      return config
    })

    await registrar
      .providers([
        'adonis-notifications/providers/NotificationsProvider',
        path.join(__dirname, '../../providers/FcmNotificationChannelProvider')
      ])
      .registerAndBoot()
  })

  test('FcmMessage', assert => {
    assert.isDefined(ioc.use('Adonis/Notifications/FcmMessage'))
    assert.isFalse(ioc._bindings['Adonis/Notifications/FcmMessage'].singleton)
    assert.equal(ioc._aliases['FcmMessage'], 'Adonis/Notifications/FcmMessage')
    assert.deepEqual(ioc.use('Adonis/Notifications/FcmMessage'), FcmMessage)
    assert.deepEqual(ioc.use('FcmMessage'), FcmMessage)
    assert.deepEqual(ioc.use('Adonis/Notifications/FcmMessage'), ioc.use('FcmMessage'))
  })

  test('FcmSender', assert => {
    assert.isDefined(ioc.use('Adonis/Notifications/FcmSender'))
    assert.isTrue(ioc._bindings['Adonis/Notifications/FcmSender'].singleton)
    assert.equal(ioc._aliases['FcmSender'], 'Adonis/Notifications/FcmSender')
    assert.instanceOf(ioc.use('Adonis/Notifications/FcmSender'), FcmSender)
    assert.instanceOf(ioc.use('FcmSender'), FcmSender)
    assert.deepEqual(ioc.use('Adonis/Notifications/FcmSender'), ioc.use('FcmSender'))
  })

  test('FcmChannel', assert => {
    assert.instanceOf(ioc.use('Notifications').channel('fcm'), FcmChannel)
  })
})
