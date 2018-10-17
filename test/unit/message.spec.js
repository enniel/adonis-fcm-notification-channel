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

  test('assign message using fluent api', assert => {
    const message = new FcmMessage()
    message
      .setCollapseKey('demo')
      .setPriority('high')
      .setContentAvailable(true)
      .setDelayWhileIdle(true)
      .setTimeToLive(3)
      .setRestrictedPackageName('somePackageName')
      .setDryRun(true)
      .setData({
        key1: 'message1',
        key2: 'message2'
      })
      .setTitle('Hello, World')
      .setIcon('ic_launcher')
      .setBody('This is a notification that will be displayed if your app is in the background.')
      .setSound('test_sound')
      .setBadge('test_badge')
      .setTag('test_tag')
      .setColor('test_color')
      .setClickAction('test_click_action')
      .setBodyLocKey('test_body_loc_key')
      .setBodyLocArgs(['body0', 'body1'])
      .setTitleLocKey('test_title_loc_key')
      .setTitleLocArgs(['title0', 'title1'])

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
        body: 'This is a notification that will be displayed if your app is in the background.',
        sound: 'test_sound',
        badge: 'test_badge',
        tag: 'test_tag',
        color: 'test_color',
        click_action: 'test_click_action',
        body_loc_key: 'test_body_loc_key',
        body_loc_args: '["body0","body1"]',
        title_loc_key: 'test_title_loc_key',
        title_loc_args: '["title0","title1"]'
      }
    })
  })

  test('assign message using setters', assert => {
    const message = new FcmMessage()
    message.collapseKey = 'demo'
    message.priority = 'high'
    message.contentAvailable = true
    message.delayWhileIdle = true
    message.timeToLive = 3
    message.restrictedPackageName = 'somePackageName'
    message.dryRun = true
    message.data = {
      key1: 'message1',
      key2: 'message2'
    }
    message.title = 'Hello, World'
    message.icon = 'ic_launcher'
    message.body = 'This is a notification that will be displayed if your app is in the background.'
    message.sound = 'test_sound'
    message.badge = 'test_badge'
    message.tag = 'test_tag'
    message.color = 'test_color'
    message.clickAction = 'test_click_action'
    message.bodyLocKey = 'test_body_loc_key'
    message.bodyLocArgs = ['body0', 'body1']
    message.titleLocKey = 'test_title_loc_key'
    message.titleLocArgs = ['title0', 'title1']

    assert.equal(message.collapseKey, 'demo')
    assert.equal(message.priority, 'high')
    assert.equal(message.contentAvailable, true)
    assert.equal(message.delayWhileIdle, true)
    assert.equal(message.timeToLive, 3)
    assert.equal(message.restrictedPackageName, 'somePackageName')
    assert.equal(message.dryRun, true)
    assert.deepEqual(message.data, {
      key1: 'message1',
      key2: 'message2'
    })
    assert.equal(message.title, 'Hello, World')
    assert.equal(message.icon, 'ic_launcher')
    assert.equal(message.body, 'This is a notification that will be displayed if your app is in the background.')
    assert.equal(message.sound, 'test_sound')
    assert.equal(message.badge, 'test_badge')
    assert.equal(message.tag, 'test_tag')
    assert.equal(message.color, 'test_color')
    assert.equal(message.clickAction, 'test_click_action')
    assert.equal(message.bodyLocKey, 'test_body_loc_key')
    assert.equal(message.bodyLocArgs, '["body0","body1"]')
    assert.equal(message.titleLocKey, 'test_title_loc_key')
    assert.equal(message.titleLocArgs, '["title0","title1"]')

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
        body: 'This is a notification that will be displayed if your app is in the background.',
        sound: 'test_sound',
        badge: 'test_badge',
        tag: 'test_tag',
        color: 'test_color',
        click_action: 'test_click_action',
        body_loc_key: 'test_body_loc_key',
        body_loc_args: '["body0","body1"]',
        title_loc_key: 'test_title_loc_key',
        title_loc_args: '["title0","title1"]'
      }
    })
  })
})
