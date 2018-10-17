'use strict'

const test = require('japa')
const FcmMessage = require('../../src/FcmMessage')
const FcmChannel = require('../../src/FcmChannel')

test.group('FcmChannel', () => {
  test('getMessage should return instanceof FcmMessage (from toFcm)', async assert => {
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
    const message = await new FcmChannel().getMessage(null, new FcmNotification())
    assert.instanceOf(message, FcmMessage)
  })

  test('getMessage should return instanceof FcmMessage (from toJSON)', async assert => {
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
    const message = await new FcmChannel().getMessage(null, new FcmNotification())
    assert.instanceOf(message, FcmMessage)
  })
})
