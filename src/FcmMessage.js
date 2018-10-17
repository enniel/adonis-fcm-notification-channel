'use strict'

const Message = require('node-gcm').Message

class FcmMessage {
  constructor (data) {
    this.message = new Message(data)
    return new Proxy(this, {
      get (target, name) {
        if (typeof target[name] !== 'undefined') {
          return target[name]
        }
        return target.message[name]
      }
    })
  }

  setApiKey (apiKey) {
    this._apiKey = apiKey

    return this
  }

  set apiKey (apiKey) {
    this.setApiKey(apiKey)
  }

  get apiKey () {
    return this._apiKey
  }

  setRequestOptions (requestOptions) {
    this._requestOptions = requestOptions

    return this
  }

  set requestOptions (requestOptions) {
    this.setRequestOptions(requestOptions)

    return this
  }

  get requestOptions () {
    return this._requestOptions
  }

  setRecipient (recipient) {
    this._recipient = recipient

    return this
  }

  set recipient (recipient) {
    this.setRecipient(recipient)
  }

  get recipient () {
    return this._recipient
  }

  setData (data) {
    this.addData(data)

    return this
  }

  set data (data) {
    this.addData(data)
  }

  get data () {
    return this.message.params.data
  }

  setCollapseKey (collapseKey) {
    this.message.params.collapseKey = collapseKey

    return this
  }

  set collapseKey (collapseKey) {
    this.setCollapseKey(collapseKey)
  }

  get collapseKey () {
    return this.message.params.collapseKey
  }

  setPriority (priority) {
    this.message.params.priority = priority

    return this
  }

  set priority (priority) {
    this.setPriority(priority)
  }

  get priority () {
    return this.message.params.priority
  }

  setContentAvailable (contentAvailable) {
    this.message.params.contentAvailable = contentAvailable

    return this
  }

  set contentAvailable (contentAvailable) {
    this.setContentAvailable(contentAvailable)
  }

  get contentAvailable () {
    return this.message.params.contentAvailable
  }

  setDelayWhileIdle (delayWhileIdle) {
    this.message.params.delayWhileIdle = delayWhileIdle

    return this
  }

  set delayWhileIdle (delayWhileIdle) {
    this.setDelayWhileIdle(delayWhileIdle)
  }

  get delayWhileIdle () {
    return this.message.params.delayWhileIdle
  }

  setTimeToLive (timeToLive) {
    this.message.params.timeToLive = timeToLive

    return this
  }

  set timeToLive (timeToLive) {
    this.setTimeToLive(timeToLive)
  }

  get timeToLive () {
    return this.message.params.timeToLive
  }

  setRestrictedPackageName (restrictedPackageName) {
    this.message.params.restrictedPackageName = restrictedPackageName

    return this
  }

  set restrictedPackageName (restrictedPackageName) {
    this.setRestrictedPackageName(restrictedPackageName)
  }

  get restrictedPackageName () {
    return this.message.params.restrictedPackageName
  }

  setDryRun (dryRun) {
    this.message.params.dryRun = dryRun

    return this
  }

  set dryRun (dryRun) {
    this.setDryRun(dryRun)
  }

  get dryRun () {
    return this.message.params.dryRun
  }

  setTitle (title) {
    this.addNotification('title', title)

    return this
  }

  set title (title) {
    this.setTitle(title)
  }

  get title () {
    return this.message.params.notification.title
  }

  setBody (body) {
    this.addNotification('body', body)

    return this
  }

  set body (body) {
    this.setBody(body)
  }

  get body () {
    return this.message.params.notification.body
  }

  setIcon (icon) {
    this.addNotification('icon', icon)

    return this
  }

  set icon (icon) {
    this.setIcon(icon)
  }

  get icon () {
    return this.message.params.notification.icon
  }

  setSound (sound) {
    this.addNotification('sound', sound)

    return this
  }

  set sound (sound) {
    this.setSound(sound)
  }

  get sound () {
    return this.message.params.notification.sound
  }

  setBadge (badge) {
    this.addNotification('badge', badge)

    return this
  }

  set badge (badge) {
    this.setBadge(badge)
  }

  get badge () {
    return this.message.params.notification.badge
  }

  setTag (tag) {
    this.addNotification('tag', tag)

    return this
  }

  set tag (tag) {
    this.setTag(tag)
  }

  get tag () {
    return this.message.params.notification.tag
  }

  setColor (color) {
    this.addNotification('color', color)

    return this
  }

  set color (color) {
    this.setColor(color)
  }

  get color () {
    return this.message.params.notification.color
  }

  setClickAction (clickAction) {
    this.addNotification('click_action', clickAction)

    return this
  }

  set clickAction (clickAction) {
    this.setClickAction(clickAction)
  }

  get clickAction () {
    return this.message.params.notification['click_action']
  }

  setBodyLocKey (bodyLocKey) {
    this.addNotification('body_loc_key', bodyLocKey)

    return this
  }

  set bodyLocKey (bodyLocKey) {
    this.setBodyLocKey(bodyLocKey)
  }

  get bodyLocKey () {
    return this.message.params.notification['body_loc_key']
  }

  setBodyLocArgs (bodyLocArgs) {
    if (Array.isArray(bodyLocArgs)) {
      bodyLocArgs = JSON.stringify(bodyLocArgs)
    }
    this.addNotification('body_loc_args', bodyLocArgs)

    return this
  }

  set bodyLocArgs (bodyLocArgs) {
    this.setBodyLocArgs(bodyLocArgs)
  }

  get bodyLocArgs () {
    return this.message.params.notification['body_loc_args']
  }

  setTitleLocKey (titleLocKey) {
    this.addNotification('title_loc_key', titleLocKey)

    return this
  }

  set titleLocKey (titleLocKey) {
    this.setTitleLocKey(titleLocKey)
  }

  get titleLocKey () {
    return this.message.params.notification['title_loc_key']
  }

  setTitleLocArgs (titleLocArgs) {
    if (Array.isArray(titleLocArgs)) {
      titleLocArgs = JSON.stringify(titleLocArgs)
    }
    this.addNotification('title_loc_args', titleLocArgs)

    return this
  }

  set titleLocArgs (titleLocArgs) {
    this.setTitleLocArgs(titleLocArgs)
  }

  get titleLocArgs () {
    return this.message.params.notification['title_loc_args']
  }

  toJSON () {
    return this.toJson()
  }
}

module.exports = FcmMessage
