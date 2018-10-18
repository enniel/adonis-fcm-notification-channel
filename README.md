# Adonis Firebase Notification Channel

[![Build Status](https://travis-ci.org/enniel/adonis-fcm-notification-channel.svg?branch=master)](https://travis-ci.org/enniel/adonis-fcm-notification-channel)
[![Coverage Status](https://coveralls.io/repos/github/enniel/adonis-fcm-notification-channel/badge.svg?branch=master)](https://coveralls.io/github/enniel/adonis-fcm-notification-channel?branch=master)

Firebase Notification Channel for [adonis-notifications](https://github.com/enniel/adonis-notifications).

## Installation

1. Add package:

```bash
$ npm i adonis-fcm-notification-channel --save
```
or

```bash
$ yarn add adonis-fcm-notification-channel
```

2. Register providers inside the your `start/app.js` file.

```js
const providers = [
  ...
  'adonis-fcm-notification-channel/providers/FcmNotificationChannelProvider',
  ...
]
```
3. Add configuration to `config/services.js` file.

```js
...
fcm: {
  apiKey: <YOUR API KEY>,
  // optional
  requestOptions: {
    proxy: 'http://127.0.0.1:8888',
    timeout: 5000
  }
}
...
```

See [node-gcm](https://github.com/ToothlessGear/node-gcm) for more information.

## Usage example

```js
// app/Model/User.js
'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static get traits () {
    return [
      '@provider:Morphable',
      '@provider:HasDatabaseNotifications',
      '@provider:Notifiable'
    ]
  }

  // array, promise or generator
  routeNotificationForFcm () {
    return ['token1', 'token2', ... ]
  }
}

module.exports = User
```

```js
// app/Notifications/FcmNotification.js
'use strict'

const FcmMessage = use('FcmMessage')

class MyNotification {
  via () {
    return ['fcm']
  }

  toFcm () {
    // from object
    const message = new FcmMessage({
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
    // using fluent api
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
    // using setters
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
    // you can set up configuration for current notification
    // using configure method
    message.configure({
      apiKey: '<YOUR API KEY>',
      // optional
      requestOptions: {
        proxy: 'http://127.0.0.1:8888',
        timeout: 5000
      }
    })
    // or setters
    message
      .setApiKey('<YOUR API KEY>')
      .setRequestOptions({
        proxy: 'http://127.0.0.1:8888',
        timeout: 5000
      })
    message.apiKey = '<YOUR API KEY>'
    message.requestOptions = {
      proxy: 'http://127.0.0.1:8888',
      timeout: 5000
    }
    return message
  }
}

module.exports = MyNotification
```

or

```js
// app/Notifications/FcmNotification.js
'use strict'

class MyNotification {
  via () {
    return ['fcm']
  }

  toJSON () {
    return {
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
    }
  }
}

module.exports = MyNotification
```

## Credits

- [Evgeni Razumov](https://github.com/enniel)

## Support

Having trouble? [Open an issue](https://github.com/enniel/adonis-fcm-notification-channel/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
