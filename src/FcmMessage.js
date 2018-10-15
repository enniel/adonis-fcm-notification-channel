'use strict'

const Message = require('node-gcm').Message
const _ = require('lodash')

const aliases = {
  toJSON: 'toJson'
}

class FcmMessage {
  constructor (data) {
    this.message = new Message(data)
    return new Proxy(this, {
      get (target, name) {
        if (_.includes(_.keys(aliases), name)) {
          name = aliases[name]
        }
        return target.message[name]
      }
    })
  }
}

module.exports = FcmMessage
