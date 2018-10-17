'use strict'

const NE = require('node-exceptions')
const Sender = require('node-gcm').Sender
const CouldNotSendNotification = require('./CouldNotSendNotification')

const exceptionMessages = {
  400: 'Invalid JSON',
  401: 'Authentication Error',
  500: 'Internal Server Error',
  503: 'Service Temporarily Unavailable'
}

class FcmSender {
  constructor (apiKey, requestOptions = {}) {
    this.apiKey = apiKey
    this.requestOptions = requestOptions
  }

  send (message, recipient) {
    const apiKey = message.apiKey || this.apiKey
    const requestOptions = message.requestOptions || this.requestOptions
    if (!apiKey) {
      throw CouldNotSendNotification.missingApiKey()
    }
    const sender = new Sender(apiKey, requestOptions)
    return new Promise((resolve, reject) => {
      sender.send(message, recipient, (err, response) => {
        if (err) {
          if (typeof err === 'number') {
            const exceptionMessage = exceptionMessages[err] || 'Undefined error'
            err = new NE.HttpException(exceptionMessage, err)
          }
          reject(err)
          return
        }
        resolve(response)
      })
    })
  }
}

module.exports = FcmSender
