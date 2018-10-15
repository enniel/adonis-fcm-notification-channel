'use strict'

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

  send (message, recipient) {
    return new Promise((resolve, reject) => {
      this.sender.send(message, recipient, (err, response) => {
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
