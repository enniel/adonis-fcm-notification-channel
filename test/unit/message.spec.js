'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect
const FcmMessage = require('../../src/FcmMessage')
require('co-mocha')

describe('FcmMessage', function () {
  context('toJSON()', function () {
    it('should be able return snake case json data from FcmMessage instance', function () {
      const message = new FcmMessage({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        restrictedPackageName: 'somePackageName',
        dryRun: true,
        data: {
          key1: 'message1',
          key2: 'message2'
        },
        notification: {
          title: 'Hello, World',
          icon: 'ic_launcher',
          body: 'This is a notification that will be displayed if your app is in the background.'
        }
      })
      expect(message.toJSON()).to.deep.equal({
        collapse_key: 'demo',
        priority: 'high',
        content_available: true,
        delay_while_idle: true,
        time_to_live: 3,
        restricted_package_name: 'somePackageName',
        dry_run: true,
        data: {
          key1: 'message1',
          key2: 'message2'
        },
        notification: {
          title: 'Hello, World',
          icon: 'ic_launcher',
          body: 'This is a notification that will be displayed if your app is in the background.'
        }
      })
    })
  })
})
