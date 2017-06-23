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
const FcmChannel = require('../../src/FcmChannel')
require('co-mocha')

describe('FcmChannel', function () {
  context('getMessage()', function () {
    it('should be able return instanceof FcmMessage from toFcm method', function () {
      class FcmNotification {
        toFcm () {
          return new FcmMessage({
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
        }
      }
      const message = (new FcmChannel().getMessage(null, new FcmNotification()))
      expect(message instanceof FcmMessage).to.be.true()
    })

    it('should be able return instanceof FcmMessage from toJSON method', function () {
      class FcmNotification {
        toJSON () {
          return {
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
          }
        }
      }
      const message = (new FcmChannel().getMessage(null, new FcmNotification()))
      expect(message instanceof FcmMessage).to.be.true()
    })
  })
})
