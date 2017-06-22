'use strict'

/**
 * adonis-fcm-notification-channel
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const Sender = require('node-gcm').Sender

class FcmSender {
  constructor (apiKey, requestOptions = {}) {
    this.sender = new Sender(apiKey, requestOptions)
  }

  send (message, tokens) {
    return new Promise((resolve, reject) => {
      this.sender(message, tokens, (error, response) => {
        if (error) {
          reject(error)
          return
        }
        resolve(error)
      })
    })
  }
}

module.exports = FcmSender
