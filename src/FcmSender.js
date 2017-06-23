'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const NE = require('node-exceptions')
const Sender = require('node-gcm').Sender

const exceptionMessages = {
  400: 'Invalid JSON',
  401: 'Authentication Error',
  500: 'Internal Server Error',
  503: 'Service Temporarily Unavailable'
}

class FcmSender {
  constructor (apiKey, requestOptions = {}) {
    this.sender = new Sender(apiKey, requestOptions)
  }

  send (message, registrationTokens) {
    return new Promise((resolve, reject) => {
      this.sender.send(message, { registrationTokens }, (exceptionStatus, response) => {
        if (exceptionStatus) {
          const exceptionMessage = exceptionMessages[exceptionStatus] || 'Undefined error'
          reject(new NE.HttpException(exceptionMessage, exceptionStatus))
          return
        }
        resolve(response)
      })
    })
  }
}

module.exports = FcmSender
