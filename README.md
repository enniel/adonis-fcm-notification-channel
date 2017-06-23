# Adonis Firebase Notification Channel

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

2. Register providers inside the your `bootstrap/app.js` file.

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
  token: <YOUR API KEY>,
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
      'Adonis/Lucid/MorphTrait',
      'Adonis/Notifications/HasDatabaseNotifications',
      'Adonis/Notifications/Notifiable'
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

const FcmMessage = use('Adonis/Notifications/FcmMessage')

class FcmNotification {
  via () {
    return ['fcm']
  }

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

module.exports = FcmNotification
```

or

```js
// app/Notifications/FcmNotification.js
'use strict'

const FcmMessage = use('Adonis/Notifications/FcmMessage')

class FcmNotification {
  via () {
    return ['fcm']
  }

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

module.exports = FcmNotification
```

## Credits

- [Evgeni Razumov](https://github.com/enniel)

## Support

Having trouble? [Open an issue](https://github.com/enniel/adonis-fcm-notification-channel/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
