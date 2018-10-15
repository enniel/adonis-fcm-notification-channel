'use strict'

const test = require('japa')
const FcmMessage = require('../../src/FcmMessage')

test.group('FcmMessage', () => {
  test('should return snake case json data from FcmMessage instance', assert => {
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
    assert.deepEqual(message.toJSON(), {
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
